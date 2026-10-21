"""Render and library contract for commercial web Wave 3.

Checkout stays a dry run. The shelf buffer opens an assembly ticket below 2.
The restore link carries no tracker parameters.
"""

from __future__ import annotations

import json
import shutil
import subprocess
import unittest
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parents[1]
APP = REPO_ROOT / "apps" / "web"
RENDER = APP / "dist" / "render_web_shell.js"
NODE = shutil.which("node")
TSC = APP / "node_modules" / "typescript" / "bin" / "tsc"


class WebCommerceContractTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls) -> None:
        if NODE is None:
            raise unittest.SkipTest("node is required to render commerce")
        if not (APP / "node_modules" / "react").exists() or not TSC.is_file():
            npm = shutil.which("npm")
            if npm is None:
                raise unittest.SkipTest("npm is required to install the web toolchain")
            install = subprocess.run(
                ["cmd", "/c", npm, "install", "--ignore-scripts"],
                cwd=APP,
                capture_output=True,
                text=True,
                encoding="utf-8",
                check=False,
            )
            if install.returncode != 0:
                raise AssertionError(install.stderr or install.stdout)
        build = subprocess.run(
            [NODE, str(TSC), "-p", "tsconfig.json"],
            cwd=APP,
            capture_output=True,
            text=True,
            encoding="utf-8",
            check=False,
        )
        if build.returncode != 0:
            raise AssertionError(build.stdout + build.stderr)

    def render(self, request: dict) -> str:
        completed = subprocess.run(
            [NODE, str(RENDER)],
            input=json.dumps(request),
            capture_output=True,
            encoding="utf-8",
            check=False,
        )
        if completed.returncode != 0:
            self.fail(completed.stderr or completed.stdout)
        return completed.stdout

    def lib_json(self, source: str) -> dict:
        completed = subprocess.run(
            [NODE, "--input-type=module", "-e", source],
            cwd=APP,
            capture_output=True,
            encoding="utf-8",
            check=False,
        )
        if completed.returncode != 0:
            self.fail(completed.stderr or completed.stdout)
        return json.loads(completed.stdout)

    def test_checkout_lists_rails_without_a_password(self) -> None:
        html = self.render({"view": "checkout"})
        self.assertIn('data-drawer="checkout"', html)
        for rail in ("Apple Pay", "Google Pay", "Credit / Debit Card (Stripe Elements)", "Cash App Pay"):
            self.assertIn(rail, html)
        self.assertIn('type="email"', html)
        self.assertIn("Subtotal: $499.00", html)
        self.assertIn("Tax: $0.00", html)
        self.assertIn("Domestic shipping: $0.00 Free Shipping", html)
        self.assertIn("Total: $499.00", html)
        self.assertIn("[ BUY A:iG APPLIANCE - $499 ]", html)
        self.assertIn("Turnkey A:iG Appliance x 1 - $499.00", html)
        self.assertNotIn('type="password"', html)
        self.assertNotIn("AIP-PURCHASE-INTENT-v1", html)
        self.assertNotIn("<script", html.lower())

    def test_confirmed_checkout_holds_the_purchase_intent(self) -> None:
        html = self.render({"view": "checkout", "confirm_purchase": True})
        self.assertIn("AIP-PURCHASE-INTENT-v1", html)
        self.assertIn("cart_total_cents: 49900", html)
        self.assertIn('data-status="HELD_DRY_RUN"', html)
        self.assertIn("Live payment was not submitted.", html)
        self.assertNotIn('type="password"', html)

    def test_buffer_triggers_assembly_below_two(self) -> None:
        low = self.lib_json(
            """
            import { applyShelfBuffer } from './dist/lib/order_buffer_manager.js'
            process.stdout.write(JSON.stringify(applyShelfBuffer(2, {
              orderId: 'ord-1001',
              sku: 'continuum-core',
              quantity: 1,
              customerEmail: 'buyer@example.com',
            })))
            """
        )
        self.assertEqual(low["previousStock"], 2)
        self.assertEqual(low["newStock"], 1)
        self.assertTrue(low["triggerAssembly"])
        self.assertEqual(low["status"], "ASSEMBLY_WORKORDER_REQUIRED")
        self.assertEqual(low["workorderTicket"]["unitsToAssemble"], 1)
        self.assertEqual(low["workorderTicket"]["urgency"], "STANDARD")
        self.assertEqual(
            low["workorderTicket"]["reason"],
            "SHELF_BUFFER_DEPLETED: Maintain 2-box pre-flashed reserve",
        )
        self.assertNotIn("buyer@example.com", json.dumps(low))
        empty = self.lib_json(
            """
            import { applyShelfBuffer } from './dist/lib/order_buffer_manager.js'
            process.stdout.write(JSON.stringify(applyShelfBuffer(2, {
              orderId: 'ord-1002',
              sku: 'continuum-core',
              quantity: 2,
              customerEmail: 'buyer@example.com',
            })))
            """
        )
        self.assertEqual(empty["newStock"], 0)
        self.assertEqual(empty["workorderTicket"]["urgency"], "HIGH")
        self.assertEqual(empty["workorderTicket"]["unitsToAssemble"], 2)
        held = self.lib_json(
            """
            import { applyShelfBuffer } from './dist/lib/order_buffer_manager.js'
            process.stdout.write(JSON.stringify(applyShelfBuffer(4, {
              orderId: 'ord-1003',
              sku: 'continuum-core',
              quantity: 1,
              customerEmail: 'buyer@example.com',
            })))
            """
        )
        self.assertEqual(held["newStock"], 3)
        self.assertFalse(held["triggerAssembly"])
        self.assertEqual(held["status"], "SHELF_OK")
        self.assertNotIn("workorderTicket", held)

    def test_portal_shows_one_click_cancellation(self) -> None:
        html = self.render({"view": "portal"})
        self.assertIn("[ MANAGE BILLING &amp; NODE LEASES → ]", html)
        self.assertIn("1-Click Subscription Cancellation", html)
        self.assertIn("1-Click Pause (No Phone Calls)", html)
        self.assertIn("Instant PDF Invoice &amp; Receipt Download", html)
        self.assertIn("Transfer Machine Lease to New Node", html)
        self.assertIn('href="/account/billing"', html)
        self.assertNotIn('type="password"', html)

    def test_cart_recovery_link_has_no_tracker(self) -> None:
        payload = self.lib_json(
            """
            import { formatCartRecovery } from './dist/lib/cart_recovery.js'
            process.stdout.write(JSON.stringify(formatCartRecovery({
              cartId: 'cart-core-01',
              sku: 'continuum-core',
              quantity: 1,
              customerEmail: 'buyer@example.com',
            })))
            """
        )
        self.assertEqual(payload["subject"], "Your A:iG Appliance reserve is held on the shelf")
        self.assertIn("A:iG Appliance", payload["subject"])
        self.assertEqual(
            payload["restoreUrl"],
            "https://aix-core.com/cart/restore?cart=snap-cart-core-01",
        )
        self.assertNotIn("utm_", payload["restoreUrl"])
        self.assertNotIn("fbclid", payload["restoreUrl"])
        self.assertNotIn("@", payload["restoreUrl"])
        self.assertNotIn("buyer@example.com", json.dumps(payload))
        self.assertNotIn("<img", payload["text"])


if __name__ == "__main__":
    unittest.main()
