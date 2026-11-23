"""Unit tests for scripts.agentproto_lora_idempotent_demo."""

from __future__ import annotations

from pathlib import Path
import tempfile
import unittest

from scripts.agentproto_lora_idempotent_demo import (
    IdempotentLoRaMailboxBridge,
    InterMeshAddress,
    MTU_MAX_BYTES,
    NonceConflictError,
    OfflineVerificationError,
    PrincipalKey,
    b64u_encode,
    run_demo,
    sign_request_envelope,
    verify_compact_wire_receipt_offline,
    verify_receipt_offline,
)


class TestAgentprotoLoRaIdempotent(unittest.TestCase):
    def test_lost_receipt_retransmit_executes_once_and_verifies_offline(self):
        report = run_demo()
        self.assertTrue(report["tx1_executed_once"])
        self.assertEqual(report["tx1_side_effect_count"], 1)
        self.assertTrue(report["tx2_retransmit_replayed_from_ledger"])
        self.assertEqual(report["tx2_side_effect_count"], 1)
        self.assertTrue(report["receipts_byte_identical"])
        self.assertTrue(report["wire_payloads_byte_identical"])
        self.assertLessEqual(report["intermesh_frame_total_bytes"], MTU_MAX_BYTES)
        self.assertTrue(report["offline_wire_verification"]["verified_offline"])
        self.assertEqual(report["offline_wire_verification"]["execution_seq"], 1)
        self.assertTrue(report["offline_json_verification"]["verified_offline"])
        self.assertTrue(report["tx3_mutated_nonce_conflict_blocked"])
        self.assertEqual(report["tx3_side_effect_count_after_conflict"], 1)

    def test_offline_verifier_rejects_tampered_result_or_wrong_nonce(self):
        with tempfile.TemporaryDirectory() as tmp:
            field_key = PrincipalKey.generate("agent:fieldguide-01.weedsport.ny")
            wt_key = PrincipalKey.generate("vessel:watchtower.weedsport.ny")
            pinned_pub = b64u_encode(wt_key.raw_public_bytes())
            bridge = IdempotentLoRaMailboxBridge(
                ledger_dir=Path(tmp),
                watchtower_key=wt_key,
                enrolled_callers={field_key.agent_id: b64u_encode(field_key.raw_public_bytes())},
                handler=lambda _a, _p: "Garden: 68F VPD 1.05",
            )
            req = sign_request_envelope(
                field_key,
                action="garden.status.snapshot",
                params={"zone": "flood_table"},
                nonce="nonce-tamper-check-01",
            )
            res = bridge.process_request(
                req,
                src_addr=InterMeshAddress.parse("fieldguide.weedsport.ny"),
                dst_addr=InterMeshAddress.parse("watchtower.weedsport.ny"),
            )

            bad_receipt = dict(res.receipt)
            bad_receipt["execution_seq"] = 2
            with self.assertRaises(OfflineVerificationError):
                verify_receipt_offline(
                    bad_receipt,
                    pinned_watchtower_pub_b64u=pinned_pub,
                    expected_nonce="nonce-tamper-check-01",
                    expected_req_digest=req["request_digest"],
                )

            with self.assertRaises(OfflineVerificationError):
                verify_compact_wire_receipt_offline(
                    res.compact_wire_frame.payload,
                    pinned_watchtower_pub_b64u=pinned_pub,
                    expected_nonce="wrong-nonce",
                    expected_req_digest=req["request_digest"],
                )


if __name__ == "__main__":
    unittest.main()
