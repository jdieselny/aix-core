# Network Working Group: `agentproto` (BoF / Individual Submission)
**Internet-Draft:** `draft-kintzele-agentproto-lora-idempotent-mailbox-00` (Revision `-01` working text)  
**Intended Status:** Informational / Experimental  
**Authors:** J. D. Kintzele (A:iX / Continuum), Agent Smith  
**Acknowledgments:** Dr. Iman Schrock (pre-execution claim & crash-reconciliation architecture review)  
**Date:** November 23, 2026  

---

# Crash-Safe Idempotent Agent Mailbox Receipts over Sub-200-Byte Lossy RF Links (`MBX-RECEIPT-v1`)

## Abstract

This document specifies a deterministic, fail-closed agent mailbox retry and receipt recovery protocol (`MBX-RECEIPT-v1` / binary wire format `MB1`) for autonomous agents and human-to-agent terminals operating over ultra-low-bandwidth, high-packet-loss, air-gapped radio links (such as 915 MHz ISM LoRa / Meshtastic `LongFast` with a strict `<= 200-byte` payload MTU) without Internet or DNS availability.

To prevent duplicate physical actuation when return acknowledgments are dropped in RF or when an executing gateway loses power mid-operation, the gateway **claims each operation durably (`IN_FLIGHT`) prior to invoking the execution handler**. On retransmission or restart, the gateway either returns the saved signed outcome (`COMPLETED`), reconciles read-only against the target device (`RECONCILED_AFTER_RESTART`), or reports `OUTCOME_UNKNOWN` and leaves the physical device untouched.

---

## 1. Live Single-Mesh 915 MHz LoRa Baseline & Worked Example

Over a 915 MHz LoRa mesh (`SF11` / `BW 250 kHz`, `LongFast`), effective payload MTU is constrained to `~200 bytes` per frame and half-duplex airtime collisions routinely drop return packets after the target gateway has already executed the requested operation.

### 1.1 Production Single-Mesh Trace (`"Garden"` Tier-1 Reflex)

Captured live on **2026-11-22T19:27:37Z** between an enrolled handheld radio (`!f670183c`, Curve25519 PKC Direct Message) and the **Watchtower** sovereign homelab gateway via **WeedStation** (`!f66f23e0`, 915 MHz LoRa base bridge over LAN TCP `:4403`):

```json
{"ts": "2026-11-22T19:27:37.426469+00:00", "direction": "rx", "from_id": "!f670183c", "to_id": "!f66f23e0", "pki": true, "auth": "AUTHORIZED_PKI_DM", "snr": 3.75, "rssi": -83, "text": "!garden"}
{"ts": "2026-11-22T19:27:37.439222+00:00", "direction": "tx", "tier": "tier1_garden", "to_id": "!f670183c", "text": "Garden: Night Tent 68F VPD 1.05 | Fan A1=ON Flood A7=OFF"}
```

- **Ingress Authentication:** Curve25519 Public-Key Encrypted Direct Message (`pki=true`); unencrypted public Channel-0 broadcasts (`to_id="^all"`) fail closed with `BROADCAST_IGNORED`.
- **Gateway Turnaround:** **`12.75 ms`** (`19:27:37.426469Z -> 19:27:37.439222Z`), zero Internet dependency.
- **Wire Footprint:** **`56 bytes` UTF-8** for the telemetry text; **`189 bytes` total** when wrapped in a signed binary `MB1` receipt inside an `InterMeshFrame` (`16B` transport header + `173B` signed receipt payload).

---

## 2. Normative Mailbox Claim-Execute-Reconcile State Machine

### 2.1 The Crash-Window Hazard

If a gateway executes a physical or state-changing handler *before* writing to its durable idempotency ledger, a power loss or process crash between handler completion and ledger insertion leaves the gateway with no record of the operation upon reboot. A subsequent client retry with the same nonce would then re-execute the handler a second time.

Conversely, if a gateway uses a naive replay cache that rejects any previously seen nonce with a generic replay error, a client whose return receipt was dropped in RF cannot recover the receipt or verify whether the operation succeeded.

### 2.2 Two-Phase Durable Ledger (`IN_FLIGHT` -> `COMPLETED` / `OUTCOME_UNKNOWN`)

For every incoming signed request with canonical digests:
- `nonce_digest = SHA-256(UTF8(nonce))`
- `request_digest = SHA-256(CanonicalJSON({caller_id, action, params, nonce}))`

the executing gateway MUST enforce the following state transitions:

```text
                    +----------------------------+
                    | Incoming Signed Request    |
                    | (nonce_digest, req_digest) |
                    +-------------+--------------+
                                  |
                      Ledger Entry Exists?
                         /            \
                       NO              YES
                       /                \
                      v                  v
        +-----------------------+   Same request_digest?
        | 1. DURABLE CLAIM      |       /          \
        | O_CREAT|O_EXCL + fsync|     NO            YES
        | state = IN_FLIGHT     |     /              \
        +-----------+-----------+    v                v
                    |         +--------------+   Check stored.state:
                    v         | FAIL CLOSED  |   - COMPLETED / OUTCOME_UNKNOWN:
        +-----------------------+ |NONCE_CONFLICT|     Skip handler; re-emit saved
        | 2. EXECUTE HANDLER    | +--------------+     signed MBX-RECEIPT-v1 / MB1.
        |    (Once)             |                - IN_FLIGHT (Crash Recovery):
        +-----------+-----------+                  NEVER re-run handler!
                    |                              Run read-only reconcile_fn():
                    v                              * Confirmed -> COMPLETED
        +-----------------------+                  * Unknown   -> OUTCOME_UNKNOWN
        | 3. ATOMIC COMMIT      |                    (leave device alone!)
        | temp + fsync + replace|
        | state = COMPLETED     |
        +-----------------------+
```

1. **Step 1 — Pre-Execution Durable Claim (`IN_FLIGHT`):**
   - After verifying the caller's Ed25519 signature (including RFC 8032 §8.8 small-order point and $S < L$ malleability checks), the gateway atomically creates `ledger/{nonce_digest}.json` using `O_CREAT | O_EXCL` and `fsync()` with `state = "IN_FLIGHT"`, `request_digest`, `execution_seq`, and `claimed_at_epoch` **before** invoking `handler()`.
2. **Step 2 — Single Execution & Atomic Commit (`COMPLETED`):**
   - The gateway invokes `handler(action, params)` once, constructs and signs the `MBX-RECEIPT-v1` receipt and compact `MB1` binary payload, writes the completed record to a temporary file with `fsync()`, and atomically promotes it via `os.replace()` to `state = "COMPLETED"`.
3. **Step 3 — Retry Handling & Post-Crash Reconciliation:**
   - **Digest Mismatch (`stored.request_digest != request_digest`):** Fail closed immediately with `NONCE_CONFLICT` regardless of ledger state.
   - **Completed Hit (`stored.state in {"COMPLETED", "OUTCOME_UNKNOWN"}`):** Do **not** invoke `handler()`. Re-emit the exact saved signed receipt payload inside a new transport frame.
   - **Orphaned In-Flight Claim (`stored.state == "IN_FLIGHT"` after gateway crash/restart):**
     - The gateway **MUST NOT** re-invoke `handler()`.
     - If a read-only `reconcile_fn(action, params)` is available and confirms the device state, the gateway promotes the record to `COMPLETED` (`policy_outcome = "RECONCILED_AFTER_RESTART"`, `status_code = 1`) and returns the signed receipt.
     - If the outcome cannot be determined read-only, the gateway records `state = "OUTCOME_UNKNOWN"` (`policy_outcome = "OUTCOME_UNKNOWN_LEAVE_DEVICE_ALONE"`, `status_code = 3`), returns the signed `OUTCOME_UNKNOWN` receipt to the caller, and **leaves the device untouched**.

### 2.3 Offline Client Verification (Internet Unplugged)

With zero Internet or DNS access, the client verifies the receipt against the gateway's pinned 32-byte Ed25519 public key:
1. Reject any public key $A$ or signature point $R$ in the 8-torsion subgroup or with $y \ge p$, and require $0 \le S < L$ (RFC 8032 §8.8).
2. Verify the 64-byte Ed25519 signature over the `MB1` body (or canonical `MBX-RECEIPT-v1` JSON).
3. Verify `nonce_digest` and `request_digest` match the transmitted request.
4. Inspect `status_code` (`1 = EXECUTED_ONCE`, `3 = OUTCOME_UNKNOWN`) and `execution_seq`.

---

## 3. `MBX-RECEIPT-v1` & `189-Byte` `MB1` Wire Format

To avoid colliding with EMILIA's `EP-RECEIPT-v1` authorization envelope, gateway mailbox execution receipts use the format identifier **`MBX-RECEIPT-v1`** (JSON) and **`MB1`** (compact binary wire payload).

### 3.1 Inner Signed Payload vs. Outer Transport Header

```text
 0                   1                   2                   3
 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|   Ver/Flags   |      TTL      |            seq_id             |  OUTER
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+  InterMeshFrame
|                          origin_hash                          |  16-Byte Header
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+  (!BBHIII)
|                         src_zone_hash                         |  [seq_id changes
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+   on each retry]
|                         dst_zone_hash                         |
+---------------+---------------+---------------+---------------+
|      'M'      |      'B'      |      '1'      |  status_code  |  INNER SIGNED
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+  MB1 Payload
|                         execution_seq                         |  (45B fixed
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+   + 64B text
|                        issued_at_epoch                        |   + 64B sig
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+   = 173 Bytes)
|                                                               |  [BYTE-IDENTICAL
+                   nonce_digest[0..16] (128b)                  +   ON RETRY]
|                                                               |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                                                               |
+                  request_digest[0..16] (128b)                 +
|                                                               |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|  result_len   |          result_text (0..68B UTF-8) ...       |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                                                               |
+                   Ed25519 Signature (64 Bytes)                +
|                    over MB1 body (bytes 0..N)                 |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
```

- **Exact Byte Accounting (Worked Garden Example in `scripts/agentproto_lora_idempotent_demo.py`):**
  - Outer `InterMeshFrame` transport header (`!BBHIII`): **`16 bytes`**
  - Inner `MB1` fixed fields (`"MB1"` + `status_code` + `execution_seq` + `issued_at_epoch` + `16B nonce_digest` + `16B request_digest` + `1B result_len`): **`45 bytes`**
  - Inner `result_text` (`"Garden: Night Tent 68F VPD 1.05 | Fan A1=ON Flood A7=09:00,17:00"`): **`64 bytes`**
  - Inner Ed25519 signature over the `109-byte` `MB1` body: **`64 bytes`**
  - **Inner Signed `MB1` Payload Total:** `45 + 64 + 64 =` **`173 bytes`** (byte-for-byte identical across retries).
  - **Total Over-the-Air LoRa Packet:** `16 + 173 =` **`189 bytes`** (`11 bytes` under the `200-byte` LoRa MTU ceiling).
  - **Retry Wire Invariant:** On retransmission (`TX #2`), the inner `173-byte` signed `MB1` payload is **byte-identical** to `TX #1` (`tx1_wire[16:] == tx2_wire[16:]`), while bytes `2..4` of the outer `16-byte` `InterMeshFrame` transport header carry the new per-transmission `seq_id` (`101 -> 102`).

---

## 4. Companion & Future Work: Two-Mesh `ZBG` Handoff & Field Guide Semantic Voice

1. **Multi-Mesh Zone Border Gateway (`ZBG`) Handoff:** The route-less 3-part addressing (`name.system.suffix`) and Dual-Homed Zone Border Gateway (`InterMeshRouter`) handoff between disjoint RF meshes (`weedsport.ny <-> portbyron.ny`) is reference-implemented in Python (`continuum/lib/intermesh_proto.py`) and will be documented in a companion draft once exercised across two live physical 915 MHz meshes.
2. **"The Field Guide" Semantic AI Walkie-Talkie:** Pairing `MBX-RECEIPT-v1` / `MB1` with local on-device STT (`whisper.cpp`) and TTS (`Piper`) compresses 5 seconds of spoken voice (`~80 KB` raw PCM) into `< 100-byte` authenticated LoRa frames (`~1,000:1` semantic compression) for off-grid spoken delivery across **SuperSlip**, **FieldGuide**, and **WideBody** terminals.
