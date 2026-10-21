"""Render contract for commercial web Wave 2 product cards and footer."""

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


class WebProductsContractTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls) -> None:
        if NODE is None:
            raise unittest.SkipTest("node is required to render the product cards")
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

    def render(self, view: str) -> str:
        completed = subprocess.run(
            [NODE, str(RENDER)],
            input=json.dumps({"view": view, "stock": 2}),
            capture_output=True,
            encoding="utf-8",
            check=False,
        )
        if completed.returncode != 0:
            self.fail(completed.stderr or completed.stdout)
        return completed.stdout

    def test_continuum_core_lists_price_nics_and_os(self) -> None:
        html = self.render("core")
        self.assertIn('data-product="continuum-core"', html)
        self.assertIn("$499.00 USD", html)
        self.assertIn("Turnkey A:iG Appliance", html)
        self.assertIn("Industrial Autonomous Cultivation Controller", html)
        self.assertIn("[ BUY A:iG APPLIANCE - $499 ]", html)
        self.assertIn("/hardware/aig_appliance_hero.jpg", html)
        self.assertIn('alt="A:iG Turnkey Industrial Cultivation Controller"', html)
        self.assertIn("A:iP Mobile Cockpit", html)
        self.assertIn("dual 2.5GbE Intel NICs", html)
        self.assertIn("Pre-Flashed Sovereign OS", html)
        self.assertIn("Alpine Linux", html)
        self.assertIn("Open BOM ($297)", html)
        self.assertIn('href="/docs/diy-calculator"', html)
        self.assertNotIn("<script", html.lower())

    def test_sniffer_lists_price_and_sensors(self) -> None:
        html = self.render("sniffer")
        self.assertIn('data-product="sniffer-pod"', html)
        self.assertIn("$89.00 USD", html)
        self.assertIn("SCD41", html)
        self.assertIn("SHT45", html)
        self.assertIn("PAR photodiode", html)
        self.assertIn("No proprietary cloud apps.", html)
        self.assertIn("/hardware/sniffer_pod_product.jpg", html)
        self.assertIn('loading="lazy"', html)
        self.assertIn('decoding="async"', html)
        self.assertIn('alt="A:iX Sniffer Pod with Sensirion SCD41 and SHT45 sensors"', html)

    def test_chernobyl_lists_thermal_trip_and_repo(self) -> None:
        html = self.render("chernobyl")
        self.assertIn('data-product="chernobyl-switch"', html)
        self.assertIn("$49.00 USD", html)
        self.assertIn("$29.00 USD", html)
        self.assertIn("95°F", html)
        self.assertIn("ZERO software dependency", html)
        self.assertIn("REPO Mushroom", html)
        self.assertIn("emergency disconnect button", html)
        self.assertIn("/hardware/chernobyl_switch_product.jpg", html)
        self.assertIn('loading="lazy"', html)
        self.assertIn('decoding="async"', html)
        self.assertIn("Chernobyl Switch 95°F thermal contactor and emergency stop", html)

    def test_bundle_links_the_free_seed_pack(self) -> None:
        html = self.render("bundle")
        self.assertIn("OP2026 Joint Cultivator Bundle", html)
        self.assertIn("FREE 3-Pack of Medical-Grade Feminized Seeds", html)
        self.assertIn("1x Turnkey A:iG Controller ($499 value)", html)
        self.assertIn('href="https://jdieselny.com/?ref=aix-core-bundle"', html)
        self.assertIn("https://jdieselny.com", html)
        self.assertIn('data-badge="seed"', html)

    def test_footer_renders_copyright_hcl_and_sister_anchor(self) -> None:
        html = self.render("footer")
        self.assertIn('data-footer="site"', html)
        self.assertIn("A:iX CONTINUUM", html)
        self.assertIn(">Hardware Catalog<", html)
        self.assertIn(">HCL v1.0<", html)
        self.assertIn('href="/docs/hcl"', html)
        self.assertIn(">Open-Source BOM<", html)
        self.assertIn(">Documentation<", html)
        self.assertIn("sister seed bank at jdieselny.com", html)
        self.assertIn('href="https://jdieselny.com"', html)
        self.assertIn("© 2026 J Diesel NY, LLC. All rights reserved. Zero telemetry. 100% sovereign.", html)


if __name__ == "__main__":
    unittest.main()
