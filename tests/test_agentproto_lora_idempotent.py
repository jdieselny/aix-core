"""Unit tests for scripts.agentproto_lora_idempotent_demo (rev -01)."""

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
    RECEIPT_SCHEMA_VERSION,
    STATUS_EXECUTED_ONCE,
    STATUS_OUTCOME_UNKNOWN,
    b64u_encode,
    run_demo,
    sign_request_envelope,
    verify_compact_wire_receipt_offline,
    verify_receipt_offline,
)


class TestAgentprotoLoRaIdempotent(unittest.TestCase):
    def test_lost_receipt_retransmit_and_crash_recovery_invariants(self):
        report = run_demo()
        self.assertEqual(report["receipt_format"], RECEIPT_SCHEMA_VERSION)
        self.assertEqual(report["wire_magic"], "MB1")
        self.assertTrue(report["tx1_executed_once"])
        self.assertEqual(report["tx1_side_effect_count"], 1)
        self.assertTrue(report["tx2_retransmit_replayed_from_ledger"])
        self.assertEqual(report["tx2_side_effect_count"], 1)
        self.assertTrue(report["inner_signed_payloads_byte_identical"])
        self.assertTrue(report["outer_frames_differ_only_in_seq_id"])
        self.assertEqual(report["intermesh_frame_total_bytes"], 189)
        self.assertEqual(report["inner_signed_payload_bytes"], 173)
        self.assertLessEqual(report["intermesh_frame_total_bytes"], MTU_MAX_BYTES)
        self.assertTrue(report["offline_wire_verification"]["verified_offline"])
        self.assertEqual(report["offline_wire_verification"]["execution_seq"], 1)
        self.assertTrue(report["offline_json_verification"]["verified_offline"])
        self.assertTrue(report["tx3_mutated_nonce_conflict_blocked"])
        self.assertEqual(report["tx3_side_effect_count_after_conflict"], 1)

        # Crash between pre-execution claim and handler completion leaves device alone
        cr = report["crash_recovery_test"]
        self.assertEqual(cr["ledger_state_after_restart_retry"], "OUTCOME_UNKNOWN")
        self.assertEqual(cr["policy_outcome"], "OUTCOME_UNKNOWN_LEAVE_DEVICE_ALONE")
        self.assertEqual(cr["status_code"], STATUS_OUTCOME_UNKNOWN)
        self.assertTrue(cr["side_effect_count_unchanged"])
        self.assertTrue(cr["verified_offline"])

    def test_crash_after_claim_with_read_only_device_reconciliation(self):
        with tempfile.TemporaryDirectory() as tmp:
            field_key = PrincipalKey.generate("agent:fieldguide-01.weedsport.ny")
            wt_key = PrincipalKey.generate("vessel:watchtower.weedsport.ny")
            pinned_pub = b64u_encode(wt_key.raw_public_bytes())
            src = InterMeshAddress.parse("fieldguide.weedsport.ny")
            dst = InterMeshAddress.parse("watchtower.weedsport.ny")

            bridge = IdempotentLoRaMailboxBridge(
                ledger_dir=Path(tmp),
                watchtower_key=wt_key,
                enrolled_callers={field_key.agent_id: b64u_encode(field_key.raw_public_bytes())},
                handler=lambda _a, _p: "WTI A7 actuated 300s",
                reconcile_fn=lambda _a, _p: "Reconciled WTI A7=OFF (completed 300s run)",
            )
            req = sign_request_envelope(
                field_key,
                action="garden.flood_pump.actuate",
                params={"duration_s": 300},
                nonce="nonce-crash-reconcile-01",
            )
            with self.assertRaises(RuntimeError):
                bridge.process_request(req, src_addr=src, dst_addr=dst, seq_id=10, simulate_crash_after_claim=True)

            # Retry after restart reconciles via read-only probe without calling handler()
            recovered = bridge.process_request(req, src_addr=src, dst_addr=dst, seq_id=11)
            self.assertEqual(bridge.side_effect_count, 0)
            self.assertEqual(recovered.ledger_state, "COMPLETED")
            self.assertEqual(recovered.receipt["policy_outcome"], "RECONCILED_AFTER_RESTART")
            verified = verify_compact_wire_receipt_offline(
                recovered.compact_wire_frame.payload,
                pinned_watchtower_pub_b64u=pinned_pub,
                expected_nonce="nonce-crash-reconcile-01",
                expected_req_digest=req["request_digest"],
            )
            self.assertEqual(verified["status_code"], STATUS_EXECUTED_ONCE)
            self.assertTrue(verified["verified_offline"])

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
