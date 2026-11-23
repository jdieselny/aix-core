# Network Working Group: `agentproto` (BoF / Individual Submission)
**Internet-Draft:** `draft-kintzele-agentproto-lora-idempotent-mailbox-00`  
**Intended Status:** Informational / Experimental  
**Authors:** J. D. Kintzele (A:iX / Continuum), Agent Smith  
**Date:** November 23, 2026  

---

# Idempotent Agent Mailbox Receipts and Route-Less Zone Handoff over Sub-200-Byte Lossy RF Meshes (`EP-RECEIPT-v1` / `InterMeshNet`)

## Abstract

This document specifies a deterministic, fail-closed agent-to-agent and human-to-agent execution protocol designed to operate over ultra-low-bandwidth, high-packet-loss, air-gapped radio links (such as 915 MHz ISM LoRa / Meshtastic `LongFast` with a strict `<= 200-byte` payload MTU) without Internet or DNS availability.

It addresses three foundational problems for autonomous agents operating on tactical or off-grid RF networks:
1. **1,000:1 Semantic Voice & Intent Compression:** Transducing spoken human intent (`~80 KB` raw 5-second PCM audio) via on-device STT (`whisper.cpp`) into `< 100-byte` authenticated frames, and synthesizing spoken audio via on-device TTS (`Piper`) at the receiving node (**The Field Guide / SuperSlip / WideBody** architecture).
2. **Air-Gapped Exactly-Once Execution under Dropped Receipts:** Binding `(nonce_digest, request_digest) -> signed EP-RECEIPT-v1` in a durable write-ahead journal prior to radio acknowledgment so that a sender whose receipt was lost to RF fading can retransmit identically and verify single execution completely offline against a pinned Ed25519 public key.
3. **Route-Less Inter-Mesh Handoff via Dual-Homed Zone Border Gateways (`ZBG`):** Bridging disjoint local RF meshes (`name.system.suffix`) without global routing tables or unbounded per-packet `SeenCache` memory growth.

---

## 1. Motivation & Measured 915 MHz RF Baseline

Conventional agent protocols assume reliable TCP/TLS streams, multi-kilobyte JSON-RPC headers, and live cloud PKI/DNS resolvers. Over a 915 MHz LoRa mesh (`SF11` / `BW 250 kHz`, `LongFast`), effective payload MTU is constrained to `~200 bytes` per packet and half-duplex airtime collisions frequently drop return acknowledgments even after the target node has already executed the requested action.

### 1.1 Production Single-Mesh Trace (`"Garden"` Tier-1 Reflex)

The following scrubbed production trace was captured on **2026-11-22T19:27:37Z** between a handheld field radio (`!f670183c`, Curve25519 PKC Direct Message) and the **Watchtower** sovereign homelab gateway via **WeedStation** (`!f66f23e0`, 915 MHz LoRa base bridge over LAN TCP `:4403`):

```json
{"ts": "2026-11-22T19:27:37.426469+00:00", "direction": "rx", "from_id": "!f670183c", "to_id": "!f66f23e0", "pki": true, "auth": "AUTHORIZED_PKI_DM", "snr": 3.75, "rssi": -83, "text": "!garden"}
{"ts": "2026-11-22T19:27:37.439222+00:00", "direction": "tx", "tier": "tier1_garden", "to_id": "!f670183c", "text": "Garden: Night Tent 68F VPD 1.05 | Fan A1=ON Flood A7=OFF"}
```

- **Ingress Authentication:** Curve25519 Public-Key Encrypted Direct Message (`pki=true`); unencrypted public Channel-0 broadcasts (`to_id="^all"`) fail closed with `BROADCAST_IGNORED`.
- **Watchtower Processing Turnaround:** **`12.75 ms`** (`19:27:37.426469Z -> 19:27:37.439222Z`), zero Internet dependency (reads pre-hydrated local RAM/datalake situational shard).
- **Egress Wire Footprint:** **`56 bytes` UTF-8** (well inside the `200-byte` single-frame LoRa budget).

---

## 2. Route Architecture & Where One Mesh Hands Off to Another (`InterMeshNet`)

### 2.1 Single-Mesh vs. Multi-Mesh Honesty Boundary

- **Live on 915 MHz RF Hardware Today:** Single-mesh topology (`Field Handheld !f670183c` $\leftrightarrow$ `[Optional High-Gain Pole/Rooftop Relay]` $\leftrightarrow$ `WeedStation Base !f66f23e0` $\leftrightarrow$ `Watchtower Agent Gateway`), plus opportunistic discovery of external local RF peers (e.g., node `0d14` observed at `RSSI -99 dBm`, `SNR +15.75 dB` on 2026-11-22).
- **Reference-Implemented & Unit-Tested (`continuum/lib/intermesh_proto.py`):** Multi-mesh `InterMeshNet` overlay routing (`InterMeshRouter`) across disjoint zones (`name.system.suffix`).

### 2.2 The Missing Label: Dual-Homed Zone Border Gateway (`ZBG`) Handoff

In `InterMeshNet`, individual nodes **never** maintain a global routing table of distant meshes. Instead, two physically or logically separate meshes (**Mesh A: `weedsport.ny`** and **Mesh B: `portbyron.ny`**) hand off traffic at a **Zone Border Gateway (`ZBG`)**:

```text
  [ Mesh A: weedsport.ny ]                         [ Mesh B: portbyron.ny ]
  (Freq/Slot A or Local Hop Domain)                (Freq/Slot B or Neighbor Domain)

  +------------------+      915 MHz LoRa      +-----------------------------------+      915 MHz LoRa      +------------------+
  | FieldGuide-01    | <--------------------> |   ZONE BORDER GATEWAY (ZBG-01)    | <--------------------> | FieldGuide-02    |
  | (dad.weedsport)  |   16B Header + <=184B  |                                   |   16B Header + <=184B  | (kid.portbyron)  |
  +------------------+                        |  Radio A: Mesh A (weedsport.ny)   |                        +------------------+
           |                                  |  Radio B: Mesh B (portbyron.ny)   |
           v                                  |  - LocalTable (Zone A)            |
  +------------------+                        |  - LocalTable (Zone B)            |
  | WeedStation Base |                        |  - HotRouteIndex (LRU nomadic)    |
  | & Watchtower     |                        |  - PendingUnknownTracker (2-strike)|
  +------------------+                        +-----------------------------------+
```

#### How the ZBG Handoff Works Step by Step:
1. **16-Byte Wire Header (`!BBHIII`):** Every `InterMeshFrame` carries `ver_flags (1B)`, `ttl (1B)`, `seq_id (2B)`, `origin_hash (4B, FNV-1a)`, `src_zone_hash (4B)`, and `dst_zone_hash (4B)` followed by `<= 184 bytes` of payload (`<= 200 bytes` total).
2. **Intra-Zone Local Delivery:** While `dst_zone_hash == local_zone_hash`, routers consult only their local neighborhood table (`LocalTable`) and `HotRouteIndex` (LRU cache of active nomadic nodes).
3. **Cross-Zone Handoff at the `ZBG`:**
   - When a frame addressed to `dst_zone_hash = fnv1a_32("portbyron.ny")` reaches **ZBG-01** on **Radio A (`weedsport.ny`)**, ZBG-01 recognizes `dst_zone_hash` as its **directly attached secondary zone** (or a known peer ZBG hop).
   - ZBG-01 decrements `ttl`, checks its **Two-Strike Unknown & Loop Guard** (`PendingUnknownTracker` + `OffenderPenaltyBox` — requiring **zero** unbounded per-packet `SeenCache`), and re-transmits the frame onto **Radio B (`portbyron.ny`)** (or across an IP/serial inter-pole backhaul link).
   - If a destination zone is genuinely unknown after Strike 1 discovery, ZBG-01 returns an `UNKNOWN_NOTICE` (`0x3`) on Strike 1 and locks looping offenders into `OffenderPenaltyBox` (`TIMEOUT_PENALTY = 0xF`) on Strike 2.

---

## 3. Normative Idempotent Receipt-Reissue Protocol (Air-Gapped Lost-Receipt Proof)

### 3.1 Threat & Failure Model

Suppose an operator or peer agent (`caller_id`) sends a signed state-changing or telemetry request over LoRa with a fresh `nonce`. Watchtower receives the frame, verifies the signature, executes the action (`execution_seq = 1`), and transmits a signed `EP-RECEIPT-v1`. If an RF collision drops that return receipt, the sender only knows that its timer expired.

If the sender retransmits with a *new* nonce, the action executes twice (fatal for physical actuation or non-idempotent state mutations). If Watchtower uses a naive replay cache that simply rejects any seen nonce with `REPLAY_DETECTED`, the sender receives an error on retransmit and **cannot distinguish whether the original request succeeded or was rejected by a replay attacker**.

### 3.2 Durable `(nonce_digest, request_digest) -> signed EP-RECEIPT-v1` Binding

To guarantee **exactly-once execution** AND **offline receipt recoverability**, the executing gateway (Watchtower) enforces the following atomic state machine:

1. **Canonical Digests:**
   - `nonce_digest = SHA-256(UTF8(nonce))`
   - `request_digest = SHA-256(CanonicalJSON({caller_id, action, params, nonce}))`
2. **Pre-Execution Ledger Lookup:**
   - Before invoking the action handler, Watchtower looks up `ledger[nonce_digest]`.
   - **Case A — Cache Miss (`nonce_digest` unseen):**
     1. Authenticate caller Ed25519 signature (with RFC 8032 §8.8 small-order point and $S < L$ malleability rejection).
     2. Execute action **once**, incrementing `execution_seq`.
     3. Sign `EP-RECEIPT-v1` (and its compact `<= 184-byte` binary wire twin `EP1`) binding `nonce_digest`, `request_digest`, `execution_seq`, `issued_at`, and `result_digest`.
     4. Atomically write `{nonce_digest, request_digest, receipt, compact_wire}` to durable storage via `O_CREAT | O_EXCL` + `fsync()` **before** transmitting the receipt over RF.
   - **Case B — Idempotent Retransmission Hit (`stored.request_digest == request_digest`):**
     1. **Do NOT invoke the action handler** (`side_effect_count` is unchanged).
     2. Re-emit the **exact byte-identical original signed `EP-RECEIPT-v1` / `EP1` wire frame** from the durable ledger.
   - **Case C — Mutated Payload Conflict (`stored.request_digest != request_digest`):**
     1. **Fail closed immediately (`NONCE_CONFLICT`).** Never execute the mutated payload and never return the prior receipt.

### 3.3 Offline Client Verification (Internet Unplugged)

Upon receiving the (initial or retransmitted) receipt, the air-gapped client performs four purely local checks using Watchtower's pinned 32-byte Ed25519 public key:

1. **RFC 8032 §8.8 Torsion & Malleability Guard:** Reject the public key $A$ and signature point $R$ if either lies in the 8-torsion subgroup or encodes $y \ge p$, and require $0 \le S < L$.
2. **Ed25519 Signature Verification:** Verify Watchtower's signature over the canonical unsigned receipt body (or binary `EP1` prefix).
3. **Request Binding:** Confirm `receipt.nonce_digest == SHA-256(nonce)` and `receipt.request_digest == SHA-256(request_core)`.
4. **Single-Execution Attestation:** Confirm `receipt.policy_outcome == "ACCEPTED_EXECUTED_ONCE"` and `receipt.execution_seq == 1` (identical across any number of dropped-receipt retransmissions).

---

## 4. Compact 200-Byte LoRa Wire Encoding (`EP1` inside `InterMeshFrame`)

To avoid multi-fragment dependencies for single-hop or multi-hop receipts, the binary `EP1` receipt payload fits inside a single `InterMeshFrame` (`16B` header + `<= 184B` payload = `<= 200B` total):

```text
 0                   1                   2                   3
 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|   Ver/Flags   |      TTL      |            seq_id             |  InterMesh
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+  16-Byte
|                          origin_hash                          |  Header
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+  (!BBHIII)
|                         src_zone_hash                         |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                         dst_zone_hash                         |
+---------------+---------------+---------------+---------------+
|      'E'      |      'P'      |      '1'      |  status_code  |  EP1 Receipt
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+  Body
|                         execution_seq                         |  (45B fixed
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+   + <=68B text
|                        issued_at_epoch                        |   + 64B sig
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+   <= 177B)
|                                                               |
+                   nonce_digest[0..16] (128b)                  +
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
|                    over EP1 body (bytes 0..N)                 |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
```

- **Measured Wire Size in Reference Harness (`scripts/iman_agentproto_lora_idempotent_demo.py`):**
  - `InterMeshFrame` Header: `16 bytes`
  - `EP1` Signed Receipt Payload (with 57-byte garden status summary): `166 bytes`
  - **Total Over-the-Air LoRa Packet:** **`182 bytes`** (`18 bytes` under the `200-byte` `LongFast` ceiling!).
  - Payloads exceeding `184 bytes` (such as compressed WebP optical snapshots or full JSON receipts) automatically drop down to **`CLCP v1` (`scripts/clcp_codec.py`)**, which segments over `PRIVATE_APP` (port 256) with `CRC-16/CCITT-FALSE` and `GF(2^8)` Reed-Solomon parity recovery (proven live over 915 MHz RF on 2026-11-21 at `22:07 EST` with a `1,982-byte` LoRa image transfer).

---

## 5. Application Layer: "The Field Guide" Semantic AI Walkie-Talkie

By combining local edge speech models (`whisper.cpp` STT + `Piper` TTS) with the idempotent `InterMeshNet` / `EP1` transport layer, a standalone off-grid handheld (**FieldGuide**, **SuperSlip**, or **WideBody** base deck running **Nomadic OS**) achieves real-time spoken communication across multi-hop LoRa links where digital voice codecs (Codec2/DMR) cannot survive:

1. **Push-to-Talk Ingress:** Operator speaks a 5-second message (`~80,000 bytes` @ 16 kHz PCM).
2. **Local Edge Transduction:** On-device `whisper.cpp` transcribes speech in `< 400 ms` into `~75 bytes` of UTF-8 text, wrapped in a signed `InterMeshFrame` (`pack_walkie_turn`, `< 150 bytes` total — a **`> 500:1` to `1,000:1` compression ratio**).
3. **Multi-Hop RF Transit & Idempotent Delivery:** Relays across treetop/rooftop repeaters and `ZBG` border gateways with cryptographic receipt confirmation.
4. **Spoken Egress:** The receiving FieldGuide verifies the sender's signature offline, logs the turn to its local timeline, and synthesizes immediate audible speech through the speaker/headset (`"From Dad: walking up to the ranger station, back in an hour"`).
