"""Wave 9: hardware inspector pins, sister-site attribution, offline checkout."""

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

PINS = (
    ("pin-network", "20", "48", "Dual 2.5GbE Ethernet Ports", "diy-n100", "Zero cloud dependence"),
    ("pin-thermal", "40", "26", "Anodized CNC Aluminum Chassis", "diy-enclosure", "Fanless and dust-proof"),
    ("pin-radar", "64", "64", "ESP32-S3 Microwave CSI Radar Coprocessor", "diy-radio", "canopy micro-vibration"),
    ("pin-chernobyl", "40", "80", "Chernobyl Snap-Action Bimetallic Safety Port (95°F cutoff)", "diy-contactor", "95°F emergency circuit breaker"),
    ("pin-relays", "72", "70", "Optoisolated 4-Channel 24V/120V Actuator Headers", "diy-pin-relays", "Quest dehumidifier"),
)


class WebInteractiveInspectorAndAttributionTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls) -> None:
        if NODE is None:
            raise unittest.SkipTest("node is required")
        if not (APP / "node_modules" / "react").exists() or not TSC.is_file():
            npm = shutil.which("npm")
            if npm is None:
                raise unittest.SkipTest("npm is required")
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

    def lib_json(self, source: str):
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

    def test_inspector_pins_reserve_the_diagram(self) -> None:
        html = self.render({"view": "inspector"})
        self.assertIn('data-inspector="hardware"', html)
        self.assertIn('data-aspect="16/9"', html)
        self.assertIn("aspect-ratio:16 / 9", html)
        self.assertIn('src="/hardware/aig_exploded_diagram.jpg"', html)
        self.assertIn('width="1376"', html)
        self.assertIn('height="768"', html)
        self.assertIn('decoding="async"', html)
        self.assertIn("#34D399", html)
        self.assertIn("[ View in DIY BOM Calculator ($297) ]", html)
        self.assertTrue((APP / "public" / "hardware" / "aig_exploded_diagram.jpg").is_file())
        for pin_id, x, y, label, bom, detail in PINS:
            self.assertIn(f'id="{pin_id}"', html)
            self.assertIn(f'data-x="{x}"', html)
            self.assertIn(f'data-y="{y}"', html)
            self.assertIn(f'aria-label="{label}"', html)
            self.assertIn("<button", html)
            self.assertIn(detail, html)
            self.assertIn(f'href="#{bom}"', html)
        self.assertIn('aria-pressed="true"', html)

    def test_referral_parser_and_session_fallback(self) -> None:
        payload = self.lib_json(
            r"""
            import {
              parseReferralSearch,
              resolveReferral,
              writeReferral,
              markDismissed,
              isDismissed,
              attachReferral,
              CULTIVATOR_BANNER,
              CULTIVATOR_BADGE,
            } from './dist/lib/referral_tracker.js'
            const memory = () => {
              const bag = new Map()
              return {
                getItem: (key) => bag.has(key) ? bag.get(key) : null,
                setItem: (key, value) => bag.set(key, value),
              }
            }
            const now = 1700000000000
            const fromRef = parseReferralSearch('?ref=jdieselny', now)
            const fromSeeds = parseReferralSearch('ref=seeds', now)
            const fromPromo = parseReferralSearch('?promo=OP2026&utm_source=jdieselny.com', now)
            const fromUtm = parseReferralSearch('?utm_source=jdieselny.com', now)
            const ignored = parseReferralSearch('?utm_source=newsletter&ref=other', now)
            const session = memory()
            const local = memory()
            writeReferral(fromPromo, session, local)
            const fallback = resolveReferral({ search: '', sessionRaw: session.getItem('aix.referral'), localRaw: null })
            const brokenSession = resolveReferral({
              search: '',
              sessionRaw: '{not-json',
              localRaw: local.getItem('aix.referral'),
            })
            const searchWins = resolveReferral({
              search: '?ref=seeds',
              sessionRaw: session.getItem('aix.referral'),
              localRaw: local.getItem('aix.referral'),
              now,
            })
            markDismissed(session)
            const cart = attachReferral([{ id: 'aig-appliance', quantity: 1 }], fromPromo)
            process.stdout.write(JSON.stringify({
              fromRef, fromSeeds, fromPromo, fromUtm, ignored, fallback, brokenSession, searchWins,
              dismissed: isDismissed(session),
              cart,
              banner: CULTIVATOR_BANNER,
              badge: CULTIVATOR_BADGE,
            }))
            """
        )
        self.assertEqual(payload["fromRef"]["source"], "jdieselny")
        self.assertEqual(payload["fromRef"]["code"], "jdieselny")
        self.assertTrue(payload["fromRef"]["discountEligible"])
        self.assertEqual(payload["fromSeeds"]["code"], "seeds")
        self.assertEqual(payload["fromPromo"]["source"], "jdieselny.com")
        self.assertEqual(payload["fromPromo"]["code"], "OP2026")
        self.assertEqual(payload["fromUtm"]["source"], "jdieselny.com")
        self.assertIsNone(payload["ignored"])
        self.assertEqual(payload["fallback"]["code"], "OP2026")
        self.assertEqual(payload["brokenSession"]["code"], "OP2026")
        self.assertEqual(payload["searchWins"]["code"], "seeds")
        self.assertTrue(payload["dismissed"])
        self.assertEqual(payload["cart"]["referral"]["code"], "OP2026")
        self.assertEqual(payload["cart"]["items"][0]["id"], "aig-appliance")
        self.assertIn("FREE 3-PACK SEED VOUCHER INCLUDED WITH A:iG APPLIANCE", payload["banner"])
        self.assertEqual(payload["badge"], "[ PROMO ACTIVE: OP2026 ]")
        html = self.render({"view": "referral", "search": "?ref=jdieselny&promo=OP2026"})
        self.assertIn('data-referral="banner"', html)
        self.assertIn(payload["banner"], html)
        self.assertIn("[ PROMO ACTIVE: OP2026 ]", html)
        self.assertIn('aria-label="Dismiss cultivator pass"', html)
        self.assertIn("[×]", html)
        hidden = self.render({"view": "referral", "search": "?ref=jdieselny", "dismissed": True})
        self.assertNotIn('data-referral="banner"', hidden)

    def test_checkout_prices_and_offline_signature(self) -> None:
        payload = self.lib_json(
            r"""
            import { createCheckout, signOfflineOrder } from './dist/lib/checkout_engine.js'
            const empty = await createCheckout({ items: [] })
            const invalid = await createCheckout({ items: [{ id: 'not-a-sku', quantity: 1 }] })
            const appliance = await createCheckout({
              items: [{ id: 'aig-appliance', quantity: 1 }],
              referral: { source: 'jdieselny.com', code: 'OP2026', timestamp: 10, discountEligible: true },
            })
            const sniffer = await createCheckout({ items: [{ id: 'sniffer-pod', quantity: 1 }] })
            const chernobyl = await createCheckout({ items: [{ id: 'chernobyl-switch', quantity: 1 }] })
            const bundle = await createCheckout({ items: [{ id: 'op2026-bundle', quantity: 1 }] })
            const mixed = await createCheckout({
              items: [
                { id: 'aig-appliance', quantity: 1 },
                { id: 'sniffer-pod', quantity: 1 },
              ],
            })
            let fetched = 0
            const stripe = await createCheckout(
              { items: [{ id: 'aig-appliance', quantity: 1 }] },
              {
                stripeKey: 'sk_test_offline',
                fetchImpl: async (url, init) => {
                  fetched += 1
                  if (String(url) !== 'https://api.stripe.com/v1/checkout/sessions') throw new Error('unexpected url')
                  if (!String(init.body).includes('[unit_amount]=49900')) throw new Error('price missing')
                  if (String(init.headers.Authorization) !== 'Bearer sk_test_offline') throw new Error('auth missing')
                  return new Response(JSON.stringify({ id: 'cs_test_123', url: 'https://checkout.stripe.com/c/pay/cs_test_123' }), { status: 200 })
                },
              },
            )
            const offlineFetch = await createCheckout(
              { items: [{ id: 'sniffer-pod', quantity: 2 }] },
              { fetchImpl: async () => { throw new Error('network') } },
            )
            process.stdout.write(JSON.stringify({
              empty, invalid, appliance, sniffer, chernobyl, bundle, mixed, stripe, fetched, offlineFetch,
            }))
            """
        )
        self.assertEqual(payload["empty"]["status"], 400)
        self.assertEqual(payload["invalid"]["status"], 400)
        order = payload["appliance"]["body"]
        self.assertEqual(payload["appliance"]["status"], 200)
        self.assertTrue(order["success"])
        self.assertEqual(order["mode"], "mock")
        self.assertEqual(order["currency"], "usd")
        self.assertEqual(order["total"], 499)
        self.assertTrue(order["orderId"].startswith("ORD-"))
        self.assertEqual(len(order["orderId"]), 9)
        self.assertEqual(order["referral"]["code"], "OP2026")
        self.assertNotIn("sk_", json.dumps(order))
        self.assertEqual(payload["sniffer"]["body"]["total"], 89)
        self.assertEqual(payload["chernobyl"]["body"]["total"], 49)
        self.assertEqual(payload["bundle"]["body"]["total"], 599)
        self.assertEqual(payload["mixed"]["body"]["total"], 588)
        self.assertEqual(payload["stripe"]["body"]["mode"], "stripe")
        self.assertEqual(payload["stripe"]["body"]["sessionId"], "cs_test_123")
        self.assertEqual(payload["fetched"], 1)
        self.assertEqual(payload["offlineFetch"]["body"]["mode"], "mock")
        self.assertEqual(payload["offlineFetch"]["body"]["total"], 178)
        signed = payload["appliance"]["body"]["signature"]
        self.assertEqual(len(signed), 64)


if __name__ == "__main__":
    unittest.main()
