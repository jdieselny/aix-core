#!/usr/bin/env python3
"""scripts/agentproto_lora_idempotent_demo.py

Standalone Cleanroom Reference Implementation & Verification Harness for:
  draft-kintzele-agentproto-lora-idempotent-mailbox-00

Air-Gapped Lost-Receipt Retransmission Proof over 915 MHz LoRa (<=200-Byte MTU)
for IETF `agentproto`.

Self-contained (requires only Python 3.10+ stdlib + `cryptography`).
Includes:
- 16-byte InterMeshNet binary wire header (`!BBHIII`) + <=184-byte payload (200B MTU)
- RFC 8032 §8.8 Ed25519 small-order torsion point & S < L malleability rejection
- Durable idempotent mailbox receipt binding:
    (nonce_digest, request_digest) -> signed EP-RECEIPT-v1 & compact EP1 wire frame
- Lost-receipt retransmission proof (executes once, re-emits byte-identical receipt,
  verifies 100% offline with internet unplugged, and fails closed on NONCE_CONFLICT)
"""

from __future__ import annotations

import argparse
import base64
from dataclasses import dataclass
from enum import IntFlag
import hashlib
import json
import os
from pathlib import Path
import struct
import sys
import tempfile
import time
from typing import Any, Callable, Mapping

from cryptography.hazmat.primitives import serialization
from cryptography.hazmat.primitives.asymmetric import ed25519

PROTOCOL_VERSION = 0x1
HEADER_FORMAT = "!BBHIII"
HEADER_SIZE_BYTES = 16
MTU_MAX_BYTES = 200
MAX_PAYLOAD_BYTES = MTU_MAX_BYTES - HEADER_SIZE_BYTES  # 184 bytes
RECEIPT_SCHEMA_VERSION = "EP-RECEIPT-v1"
COMPACT_WIRE_MAGIC = b"EP1"
CANONICAL_SEPARATORS = (",", ":")

# RFC 8032 §8.8 torsion denylist & field prime / group order
_ED25519_P = 2**255 - 19
_ED25519_ORDER = 2**252 + 27742317777372353535851937790883648493
_SMALL_ORDER_ENCODINGS = frozenset(
    bytes.fromhex(h)
    for h in (
        "0000000000000000000000000000000000000000000000000000000000000000",
        "0000000000000000000000000000000000000000000000000000000000000080",
        "0100000000000000000000000000000000000000000000000000000000000000",
        "26e8958fc2b227b045c3f489f2ef98f0d5dfac05d3c63339b13802886d53fc05",
        "26e8958fc2b227b045c3f489f2ef98f0d5dfac05d3c63339b13802886d53fc85",
        "c7176a703d4dd84fba3c0b760d10670f2a2053fa2c39ccc64ec7fd7792ac037a",
        "c7176a703d4dd84fba3c0b760d10670f2a2053fa2c39ccc64ec7fd7792ac03fa",
        "ecffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff7f",
    )
)


class NonceConflictError(ValueError):
    """Raised when a retransmission reuses a nonce with a different request digest."""


class OfflineVerificationError(ValueError):
    """Raised when an offline client cannot cryptographically verify a receipt."""


class FrameFlags(IntFlag):
    ACK = 0x0
    DISCOVER = 0x1
    ROUTE_HIT = 0x2
    UNKNOWN_NOTICE = 0x3
    DATA = 0x4
    STREAM = 0x8
    TIMEOUT_PENALTY = 0xF


def fnv1a_32(text: str) -> int:
    h = 0x811C9DC5
    for b in text.strip().lower().encode("utf-8"):
        h ^= b
        h = (h * 0x01000193) & 0xFFFFFFFF
    return h


@dataclass(frozen=True)
class InterMeshAddress:
    name: str
    system: str
    suffix: str

    @classmethod
    def parse(cls, raw: str) -> "InterMeshAddress":
        parts = [p.strip() for p in raw.strip().split(".")]
        if len(parts) != 3 or any(not p for p in parts):
            raise ValueError(f"Invalid InterMeshNet 3-part address '{raw}'")
        return cls(name=parts[0], system=parts[1], suffix=parts[2])

    @property
    def full(self) -> str:
        return f"{self.name}.{self.system}.{self.suffix}"

    @property
    def zone(self) -> str:
        return f"{self.system}.{self.suffix}"

    @property
    def origin_hash(self) -> int:
        return fnv1a_32(self.full)

    @property
    def zone_hash(self) -> int:
        return fnv1a_32(self.zone)


@dataclass
class InterMeshFrame:
    flags: FrameFlags
    ttl: int
    seq_id: int
    origin_hash: int
    src_zone_hash: int
    dst_zone_hash: int
    payload: bytes = b""
    version: int = PROTOCOL_VERSION

    def __post_init__(self) -> None:
        if len(self.payload) > MAX_PAYLOAD_BYTES:
            raise ValueError(f"Payload ({len(self.payload)}B) exceeds {MAX_PAYLOAD_BYTES}B limit")

    def to_bytes(self) -> bytes:
        ver_flags = ((self.version & 0x0F) << 4) | (int(self.flags) & 0x0F)
        header = struct.pack(
            HEADER_FORMAT,
            ver_flags,
            self.ttl & 0xFF,
            self.seq_id & 0xFFFF,
            self.origin_hash & 0xFFFFFFFF,
            self.src_zone_hash & 0xFFFFFFFF,
            self.dst_zone_hash & 0xFFFFFFFF,
        )
        return header + self.payload


def is_small_order_encoding(raw: bytes) -> bool:
    if not isinstance(raw, (bytes, bytearray)) or len(raw) != 32:
        return True
    raw = bytes(raw)
    if raw in _SMALL_ORDER_ENCODINGS:
        return True
    y = int.from_bytes(raw, "little") & ((1 << 255) - 1)
    return y >= _ED25519_P


def b64u_encode(data: bytes) -> str:
    return base64.urlsafe_b64encode(data).decode("ascii").rstrip("=")


def b64u_decode(text: str) -> bytes:
    clean = text.strip()
    pad = "=" * ((4 - len(clean) % 4) % 4)
    return base64.urlsafe_b64decode(clean + pad)


def canonical_json(obj: Any) -> str:
    return json.dumps(obj, sort_keys=True, separators=CANONICAL_SEPARATORS, ensure_ascii=False)


def compute_digest(data: str | bytes | Mapping[str, Any]) -> str:
    if isinstance(data, (dict, list)):
        raw = canonical_json(data).encode("utf-8")
    elif isinstance(data, str):
        raw = data.encode("utf-8")
    else:
        raw = data
    return hashlib.sha256(raw).hexdigest()


def nonce_digest(nonce: str) -> str:
    if not isinstance(nonce, str) or not nonce.strip():
        raise ValueError("nonce must be a non-empty string")
    return hashlib.sha256(nonce.encode("utf-8")).hexdigest()


@dataclass
class PrincipalKey:
    agent_id: str
    private_key: ed25519.Ed25519PrivateKey | None = None
    public_key: ed25519.Ed25519PublicKey | None = None

    @classmethod
    def generate(cls, agent_id: str) -> "PrincipalKey":
        priv = ed25519.Ed25519PrivateKey.generate()
        return cls(agent_id=agent_id, private_key=priv, public_key=priv.public_key())

    def raw_public_bytes(self) -> bytes:
        assert self.public_key is not None
        return self.public_key.public_bytes(
            encoding=serialization.Encoding.Raw,
            format=serialization.PublicFormat.Raw,
        )


def verify_b64u_signature(
    public_key_b64u: str,
    message: bytes | str | Mapping[str, Any],
    signature_b64u: str,
) -> bool:
    try:
        pub_raw = b64u_decode(public_key_b64u)
        if is_small_order_encoding(pub_raw):
            return False
        pub = ed25519.Ed25519PublicKey.from_public_bytes(pub_raw)
        sig_bytes = b64u_decode(signature_b64u)
        if len(sig_bytes) != 64 or is_small_order_encoding(sig_bytes[:32]):
            return False
        if int.from_bytes(sig_bytes[32:], "little") >= _ED25519_ORDER:
            return False
        if isinstance(message, (dict, list)):
            data = canonical_json(message).encode("utf-8")
        elif isinstance(message, str):
            data = message.encode("utf-8")
        else:
            data = message
        pub.verify(sig_bytes, data)
        return True
    except Exception:
        return False


def request_core_digest(caller_id: str, action: str, params: dict[str, Any], nonce: str) -> str:
    return compute_digest({"caller_id": caller_id, "action": action, "params": params, "nonce": nonce})


def sign_request_envelope(
    caller_key: PrincipalKey,
    *,
    action: str,
    params: dict[str, Any],
    nonce: str,
    iat: int | None = None,
) -> dict[str, Any]:
    ts = int(time.time()) if iat is None else int(iat)
    req_digest = request_core_digest(caller_key.agent_id, action, params, nonce)
    unsigned = {
        "v": 1,
        "caller_id": caller_key.agent_id,
        "action": action,
        "params": params,
        "nonce": nonce,
        "iat": ts,
        "request_digest": req_digest,
    }
    assert caller_key.private_key is not None
    sig_bytes = caller_key.private_key.sign(canonical_json(unsigned).encode("utf-8"))
    return {**unsigned, "sig_b64u": b64u_encode(sig_bytes)}


def pack_compact_wire_receipt(
    *,
    nonce_dig_hex: str,
    req_dig_hex: str,
    execution_seq: int,
    issued_at_epoch: int,
    status_code: int,
    result_text: str,
    watchtower_key: PrincipalKey,
) -> bytes:
    text_bytes = result_text.encode("utf-8")[:68]
    body = (
        COMPACT_WIRE_MAGIC
        + struct.pack("!BII", status_code & 0xFF, execution_seq & 0xFFFFFFFF, issued_at_epoch & 0xFFFFFFFF)
        + bytes.fromhex(nonce_dig_hex)[:16]
        + bytes.fromhex(req_dig_hex)[:16]
        + struct.pack("!B", len(text_bytes))
        + text_bytes
    )
    assert watchtower_key.private_key is not None
    sig = watchtower_key.private_key.sign(body)
    wire = body + sig
    assert len(wire) <= MAX_PAYLOAD_BYTES, f"Wire receipt {len(wire)}B > {MAX_PAYLOAD_BYTES}B"
    return wire


def verify_compact_wire_receipt_offline(
    wire: bytes,
    *,
    pinned_watchtower_pub_b64u: str,
    expected_nonce: str,
    expected_req_digest: str,
) -> dict[str, Any]:
    if len(wire) < 3 + 9 + 16 + 16 + 1 + 64 or wire[:3] != COMPACT_WIRE_MAGIC:
        raise OfflineVerificationError("Invalid or truncated compact wire receipt")
    body = wire[:-64]
    sig_b64u = b64u_encode(wire[-64:])
    if not verify_b64u_signature(pinned_watchtower_pub_b64u, body, sig_b64u):
        raise OfflineVerificationError("Ed25519 signature verification failed offline")

    status_code, exec_seq, issued_at = struct.unpack("!BII", body[3:12])
    nonce_prefix = body[12:28].hex()
    req_prefix = body[28:44].hex()
    text_len = body[44]
    result_text = body[45 : 45 + text_len].decode("utf-8", errors="replace")

    if nonce_prefix != nonce_digest(expected_nonce)[:32]:
        raise OfflineVerificationError("Receipt nonce_digest prefix mismatch")
    if req_prefix != expected_req_digest[:32]:
        raise OfflineVerificationError("Receipt request_digest prefix mismatch")

    return {
        "verified_offline": True,
        "status_code": status_code,
        "execution_seq": exec_seq,
        "issued_at_epoch": issued_at,
        "nonce_digest_128": nonce_prefix,
        "request_digest_128": req_prefix,
        "result_text": result_text,
    }


def verify_receipt_offline(
    receipt: dict[str, Any],
    *,
    pinned_watchtower_pub_b64u: str,
    expected_nonce: str,
    expected_req_digest: str,
) -> dict[str, Any]:
    sig_block = receipt.get("signature") or {}
    sig_b64u = str(sig_block.get("sig_b64u") or "")
    unsigned = {k: v for k, v in receipt.items() if k != "signature"}
    if not verify_b64u_signature(pinned_watchtower_pub_b64u, unsigned, sig_b64u):
        raise OfflineVerificationError("EP-RECEIPT-v1 Ed25519 signature invalid")
    if receipt.get("nonce_digest") != nonce_digest(expected_nonce):
        raise OfflineVerificationError("EP-RECEIPT-v1 nonce_digest mismatch")
    if receipt.get("request_digest") != expected_req_digest:
        raise OfflineVerificationError("EP-RECEIPT-v1 request_digest mismatch")
    return {
        "verified_offline": True,
        "receipt_id": receipt["receipt_id"],
        "execution_seq": receipt["execution_seq"],
        "issued_at": receipt["issued_at"],
        "policy_outcome": receipt["policy_outcome"],
        "result_summary": receipt["result_summary"],
    }


@dataclass
class BridgeProcessResult:
    receipt: dict[str, Any]
    compact_wire_frame: InterMeshFrame
    replayed_from_ledger: bool
    side_effect_count: int


class IdempotentLoRaMailboxBridge:
    def __init__(
        self,
        ledger_dir: Path,
        watchtower_key: PrincipalKey,
        enrolled_callers: dict[str, str],
        handler: Callable[[str, dict[str, Any]], str],
    ) -> None:
        self.ledger_dir = Path(ledger_dir)
        self.ledger_dir.mkdir(parents=True, exist_ok=True)
        self.watchtower_key = watchtower_key
        self.enrolled_callers = dict(enrolled_callers)
        self.handler = handler
        self.side_effect_count = 0

    def process_request(
        self,
        envelope: dict[str, Any],
        *,
        src_addr: InterMeshAddress,
        dst_addr: InterMeshAddress,
        seq_id: int = 1,
    ) -> BridgeProcessResult:
        caller_id = str(envelope.get("caller_id") or "")
        action = str(envelope.get("action") or "")
        params = dict(envelope.get("params") or {})
        nonce = str(envelope.get("nonce") or "")
        sig_b64u = str(envelope.get("sig_b64u") or "")

        if caller_id not in self.enrolled_callers:
            raise PermissionError(f"Unenrolled caller: {caller_id}")
        unsigned = {k: v for k, v in envelope.items() if k != "sig_b64u"}
        if not verify_b64u_signature(self.enrolled_callers[caller_id], unsigned, sig_b64u):
            raise PermissionError("Caller Ed25519 signature invalid")

        calc_req_digest = request_core_digest(caller_id, action, params, nonce)
        if envelope.get("request_digest") != calc_req_digest:
            raise ValueError("Envelope request_digest mismatch")

        n_digest = nonce_digest(nonce)
        rec_path = self.ledger_dir / f"{n_digest}.json"

        if rec_path.is_file():
            stored = json.loads(rec_path.read_text(encoding="utf-8"))
            if stored.get("request_digest") != calc_req_digest:
                raise NonceConflictError(
                    f"NONCE_CONFLICT: nonce_digest={n_digest[:16]} reused with mutated payload "
                    f"(expected {stored.get('request_digest')[:16]}, got {calc_req_digest[:16]})"
                )
            frame = InterMeshFrame(
                flags=FrameFlags.ACK | FrameFlags.DATA,
                ttl=4,
                seq_id=seq_id,
                origin_hash=dst_addr.origin_hash,
                src_zone_hash=dst_addr.zone_hash,
                dst_zone_hash=src_addr.zone_hash,
                payload=bytes.fromhex(stored["compact_wire_hex"]),
            )
            return BridgeProcessResult(
                receipt=stored["receipt"],
                compact_wire_frame=frame,
                replayed_from_ledger=True,
                side_effect_count=self.side_effect_count,
            )

        self.side_effect_count += 1
        exec_seq = self.side_effect_count
        issued_epoch = int(time.time())
        issued_iso = time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime(issued_epoch))
        result_text = self.handler(action, params)

        unsigned_receipt = {
            "version": RECEIPT_SCHEMA_VERSION,
            "receipt_id": f"rcpt-{n_digest[:16]}",
            "issued_at": issued_iso,
            "issued_at_epoch": issued_epoch,
            "evaluator": self.watchtower_key.agent_id,
            "caller_id": caller_id,
            "action": action,
            "nonce_digest": n_digest,
            "request_digest": calc_req_digest,
            "execution_seq": exec_seq,
            "policy_outcome": "ACCEPTED_EXECUTED_ONCE",
            "result_summary": result_text,
            "result_digest": compute_digest(result_text),
        }
        assert self.watchtower_key.private_key is not None
        sig_bytes = self.watchtower_key.private_key.sign(canonical_json(unsigned_receipt).encode("utf-8"))
        signed_receipt = {
            **unsigned_receipt,
            "signature": {
                "key_id": f"{self.watchtower_key.agent_id}:ed25519:1",
                "alg": "Ed25519",
                "sig_b64u": b64u_encode(sig_bytes),
            },
        }
        wire_payload = pack_compact_wire_receipt(
            nonce_dig_hex=n_digest,
            req_dig_hex=calc_req_digest,
            execution_seq=exec_seq,
            issued_at_epoch=issued_epoch,
            status_code=1,
            result_text=result_text,
            watchtower_key=self.watchtower_key,
        )

        fd = os.open(rec_path, os.O_WRONLY | os.O_CREAT | os.O_EXCL, 0o600)
        with os.fdopen(fd, "w", encoding="utf-8") as fh:
            json.dump(
                {
                    "nonce_digest": n_digest,
                    "request_digest": calc_req_digest,
                    "receipt": signed_receipt,
                    "compact_wire_hex": wire_payload.hex(),
                },
                fh,
                indent=2,
            )
            fh.write("\n")
            fh.flush()
            os.fsync(fh.fileno())

        frame = InterMeshFrame(
            flags=FrameFlags.ACK | FrameFlags.DATA,
            ttl=4,
            seq_id=seq_id,
            origin_hash=dst_addr.origin_hash,
            src_zone_hash=dst_addr.zone_hash,
            dst_zone_hash=src_addr.zone_hash,
            payload=wire_payload,
        )
        return BridgeProcessResult(
            receipt=signed_receipt,
            compact_wire_frame=frame,
            replayed_from_ledger=False,
            side_effect_count=self.side_effect_count,
        )


def run_demo() -> dict[str, Any]:
    with tempfile.TemporaryDirectory() as tmp:
        field_key = PrincipalKey.generate("agent:fieldguide-01.weedsport.ny")
        watchtower_key = PrincipalKey.generate("vessel:watchtower.weedsport.ny")
        src_addr = InterMeshAddress.parse("fieldguide.weedsport.ny")
        dst_addr = InterMeshAddress.parse("watchtower.weedsport.ny")

        pinned_wt_pub = b64u_encode(watchtower_key.raw_public_bytes())
        enrolled = {field_key.agent_id: b64u_encode(field_key.raw_public_bytes())}

        bridge = IdempotentLoRaMailboxBridge(
            ledger_dir=Path(tmp),
            watchtower_key=watchtower_key,
            enrolled_callers=enrolled,
            handler=lambda _a, _p: "Garden: Night Tent 68F VPD 1.05 | Fan A1=ON Flood A7=09:00,17:00",
        )

        nonce = "iman-airgap-nonce-20261123-0001"
        req = sign_request_envelope(
            field_key,
            action="garden.status.snapshot",
            params={"zone": "flood_table"},
            nonce=nonce,
            iat=1795453200,
        )

        tx1 = bridge.process_request(req, src_addr=src_addr, dst_addr=dst_addr, seq_id=101)
        tx2 = bridge.process_request(req, src_addr=src_addr, dst_addr=dst_addr, seq_id=102)
        tx2_wire_bytes = tx2.compact_wire_frame.to_bytes()

        wire_verified = verify_compact_wire_receipt_offline(
            tx2.compact_wire_frame.payload,
            pinned_watchtower_pub_b64u=pinned_wt_pub,
            expected_nonce=nonce,
            expected_req_digest=req["request_digest"],
        )
        json_verified = verify_receipt_offline(
            tx2.receipt,
            pinned_watchtower_pub_b64u=pinned_wt_pub,
            expected_nonce=nonce,
            expected_req_digest=req["request_digest"],
        )

        mutated = sign_request_envelope(
            field_key,
            action="garden.status.snapshot",
            params={"zone": "MUTATED_CONFLICT"},
            nonce=nonce,
            iat=1795453205,
        )
        conflict_blocked = False
        conflict_err = ""
        try:
            bridge.process_request(mutated, src_addr=src_addr, dst_addr=dst_addr, seq_id=103)
        except NonceConflictError as exc:
            conflict_blocked = True
            conflict_err = str(exc)

        return {
            "protocol": "IETF-agentproto-LoRa-Idempotent-Mailbox-PoC",
            "internet_connected": False,
            "lora_mtu_limit_bytes": MTU_MAX_BYTES,
            "tx1_executed_once": not tx1.replayed_from_ledger,
            "tx1_side_effect_count": tx1.side_effect_count,
            "tx1_receipt_dropped_in_rf": True,
            "tx2_retransmit_replayed_from_ledger": tx2.replayed_from_ledger,
            "tx2_side_effect_count": tx2.side_effect_count,
            "receipts_byte_identical": canonical_json(tx1.receipt) == canonical_json(tx2.receipt),
            "wire_payloads_byte_identical": tx1.compact_wire_frame.payload == tx2.compact_wire_frame.payload,
            "intermesh_frame_total_bytes": len(tx2_wire_bytes),
            "intermesh_payload_bytes": len(tx2.compact_wire_frame.payload),
            "offline_wire_verification": wire_verified,
            "offline_json_verification": json_verified,
            "tx3_mutated_nonce_conflict_blocked": conflict_blocked,
            "tx3_conflict_detail": conflict_err,
            "tx3_side_effect_count_after_conflict": bridge.side_effect_count,
            "sample_signed_receipt": tx2.receipt,
        }


def main() -> int:
    parser = argparse.ArgumentParser(description="Run IETF agentproto LoRa idempotent receipt demo")
    parser.parse_args()
    print(json.dumps(run_demo(), indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
