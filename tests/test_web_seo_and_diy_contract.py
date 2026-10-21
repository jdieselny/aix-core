"""Render contract for Wave 4: DIY calculator, competitor matrix, and JSON-LD."""

from __future__ import annotations

import json
import re
import shutil
import subprocess
import unittest
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parents[1]
APP = REPO_ROOT / "apps" / "web"
RENDER = APP / "dist" / "render_web_shell.js"
NODE = shutil.which("node")
TSC = APP / "node_modules" / "typescript" / "bin" / "tsc"
TRACKERS = (
    "googletagmanager",
    "google-analytics",
    "facebook.net",
    "hotjar",
    "segment.com",
    "doubleclick",
    "gtag(",
    "fbq(",
    "plausible.io",
)


class WebSeoAndDiyContractTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls) -> None:
        if NODE is None:
            raise unittest.SkipTest("node is required to render wave 4")
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

    def test_diy_calculator_shows_297_and_499(self) -> None:
        html = self.render({"view": "bom"})
        self.assertIn("Build It Yourself (DIY)", html)
        self.assertIn("DIY total: $297.00 USD", html)
        self.assertIn("Turnkey A:iG Appliance", html)
        self.assertIn("$499.00 USD", html)
        self.assertIn("/hardware/aig_exploded_diagram.jpg", html)
        self.assertIn("Intel N100 Quad-Core Mini-PC: $130.00", html)
        self.assertIn("Sensirion SHT45 Temp/RH: $4.80", html)
        self.assertIn("~12 hours of your time", html)
        self.assertIn("[ Order Turnkey A:iG Appliance - $499 ]", html)
        self.assertIn("Selected parts: $254.80", html)
        self.assertIn('type="checkbox"', html)
        self.assertNotIn('type="password"', html)
        trimmed = self.render({"view": "bom", "omit": ["n100"]})
        self.assertIn("Selected parts: $124.80", trimmed)
        self.assertIn('data-part="n100" data-checked="false"', trimmed)
        self.assertIn("DIY total: $297.00 USD", trimmed)

    def test_competitor_matrix_lists_four_platforms_and_the_lock(self) -> None:
        html = self.render({"view": "compare"})
        for name in (
            "A:iG (The Appliance)",
            "AC Infinity Controller 69 Pro",
            "TrolMaster Hydro-X Pro",
            "Pulse Pro",
        ):
            self.assertIn(name, html)
        self.assertIn("Local-First Zero Cloud", html)
        self.assertIn("YES (100% Sovereign)", html)
        self.assertIn("Encrypted mTLS / WireGuard", html)
        self.assertIn("Photoperiod Hardware Interlock", html)
        self.assertIn("YES (423 LOCKED)", html)
        self.assertIn("Through-the-Wall Presence Radar", html)
        self.assertIn("52-Subcarrier CSI", html)
        self.assertIn("14-Day Grace; Never Kills Crops", html)
        self.assertIn("$499 Turnkey (or $297 DIY)", html)
        self.assertIn("~$150-$400", html)
        self.assertIn("$900-$2,500", html)
        self.assertIn("$500+", html)

    def test_seo_jsonld_is_a_priced_product(self) -> None:
        html = self.render({"view": "seo"})
        self.assertIn('rel="canonical" href="https://aix-core.com"', html)
        self.assertIn("A:iX Core — Turnkey A:iG Appliance", html)
        self.assertIn("A:iP Mobile Cockpit", html)
        self.assertIn("aix-core, autonomous grow room controller, indoor garden IoT, photoperiod interlock, sovereign edge compute", html)
        match = re.search(r'<script type="application/ld\+json">(.*?)</script>', html)
        self.assertIsNotNone(match)
        data = json.loads(match.group(1))
        self.assertEqual(data["@type"], "Product")
        self.assertEqual(data["name"], "Turnkey A:iG Appliance")
        self.assertEqual(data["sku"], "AIG-CORE-01")
        self.assertEqual(data["brand"]["name"], "A:iX")
        self.assertEqual(data["manufacturer"]["name"], "J Diesel NY, LLC")
        self.assertEqual(data["offers"]["price"], "499.00")
        self.assertEqual(data["offers"]["priceCurrency"], "USD")
        self.assertEqual(data["offers"]["availability"], "https://schema.org/InStock")
        self.assertEqual(data["offers"]["priceValidUntil"], "2027-12-31")
        self.assertEqual(data["offers"]["url"], "https://aix-core.com/hardware/core")
        lowered = html.lower()
        for tracker in TRACKERS:
            self.assertNotIn(tracker, lowered)


if __name__ == "__main__":
    unittest.main()
