"""Render contract for the A:iX sovereign trifecta showcase."""

from __future__ import annotations

import json
import re
import shutil
import subprocess
import unittest
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parents[1]
APP = REPO_ROOT / "apps" / "web"
PUBLIC = APP / "public"
RENDER = APP / "dist" / "render_web_shell.js"
NODE = shutil.which("node")
TSC = APP / "node_modules" / "typescript" / "bin" / "tsc"

ASSETS = (
    "brand/aix_mark.svg",
    "brand/aig_mark.svg",
    "brand/aib_mark.svg",
    "brand/aip_mark.svg",
    "hardware/aig_appliance_hero.jpg",
    "hardware/aig_unboxing_package.jpg",
    "hardware/aib_hero_enclave.jpg",
    "hardware/aib_enterprise_rack_hero.jpg",
    "hardware/aib_datacenter_humanoid_curtailment.jpg",
    "hardware/aip_mobile_cockpit_in_hand.jpg",
    "hardware/mobile_cockpit_glance_view.jpg",
    "hardware/mobile_homestead_radar_map.jpg",
)

HARDWARE = (
    "/hardware/aig_unboxing_package.jpg",
    "/hardware/aib_hero_enclave.jpg",
    "/hardware/aib_enterprise_rack_hero.jpg",
    "/hardware/aib_datacenter_humanoid_curtailment.jpg",
    "/hardware/aip_mobile_cockpit_in_hand.jpg",
    "/hardware/mobile_cockpit_glance_view.jpg",
    "/hardware/mobile_homestead_radar_map.jpg",
)

KEYWORDS = (
    "A:iX Core",
    "Sovereign Hardware",
    "Turnkey A:iG Appliance",
    "A:iB Compute Enclave",
    "A:iP Mobile Cockpit",
    "CSI Microwave Radar",
    "Open DIY Grow Controller",
)


class WebTrifectaContractTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls) -> None:
        if NODE is None:
            raise unittest.SkipTest("node is required to render the trifecta")
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

    def test_home_renders_three_tiers_in_order(self) -> None:
        html = self.render({"view": "home", "stock": 2})
        for tier in ("aig-garden", "aib-enclave", "aip-pocket"):
            self.assertIn(f'id="{tier}"', html)
        self.assertIn("[ INDUSTRIAL EDGE APPLIANCE ]", html)
        self.assertIn("[ AIR-GAPPED COMPUTE ENCLAVE ]", html)
        self.assertIn("[ HANDHELD TACTICAL COCKPIT ]", html)
        self.assertIn("A:iG Turnkey Appliance", html)
        self.assertIn("aig_unboxing_package.jpg", html)
        self.assertIn("aip_mobile_cockpit_in_hand.jpg", html)
        self.assertIn("aib_datacenter_humanoid_curtailment.jpg", html)
        self.assertIn("A:iP Mobile Cockpit", html)
        self.assertIn("HOMESTEAD &amp; ENTERPRISE FLEET", html)
        self.assertIn("BYOK OPEN CLIENT · NOMADIC PWA", html)
        self.assertIn('href="#storefront"', html)
        self.assertIn("minmax(320px, 1fr)", html)
        order = (
            'id="trifecta"',
            'id="storefront"',
            'id="diy-calculator"',
            'id="compare"',
            'data-testbed="marty"',
            'data-portal="billing"',
            'data-drawer="checkout"',
            'data-footer="site"',
        )
        positions = [html.index(token) for token in order]
        self.assertEqual(positions, sorted(positions))
        self.assertIn('src="/brand/aix_mark.svg"', html)
        self.assertIn(">A:iX Trifecta<", html)
        self.assertIn(">A:iG Garden Hardware<", html)
        self.assertIn(">Open DIY BOM<", html)
        self.assertIn('href="#compare"', html)
        self.assertIn('href="https://jdieselny.com"', html)

    def test_asset_paths_resolve_on_disk(self) -> None:
        html = self.render({"view": "home", "stock": 2})
        for relative in ASSETS:
            path = PUBLIC / relative
            self.assertTrue(path.is_file(), relative)
            self.assertIn(f"/{relative}", html)

    def test_images_reserve_space_without_lazy_loading(self) -> None:
        html = self.render({"view": "home", "stock": 2})
        tags = re.findall(r"<img\b[^>]*>", html)
        hero = [tag for tag in tags if 'fetchpriority="high"' in tag]
        self.assertEqual(len(hero), 1)
        self.assertIn('src="/hardware/aig_appliance_hero.jpg"', hero[0])
        self.assertNotIn("loading=", hero[0])
        appliance = [
            tag
            for tag in tags
            if 'src="/hardware/aig_appliance_hero.jpg"' in tag and 'fetchpriority="low"' in tag
        ]
        self.assertGreaterEqual(len(appliance), 1)
        for token in ('decoding="async"', 'width="1376"', 'height="768"', "sizes=", 'alt="'):
            self.assertIn(token, appliance[0])
        for src in HARDWARE:
            matches = [tag for tag in tags if f'src="{src}"' in tag]
            self.assertEqual(len(matches), 1, src)
            tag = matches[0]
            for token in ('decoding="async"', 'fetchpriority="low"', "sizes=", 'alt="'):
                self.assertIn(token, tag)
            self.assertNotIn("loading=", tag)
            self.assertRegex(tag, r'width="\d+"')
            self.assertRegex(tag, r'height="\d+"')
        for src in ("/brand/aix_mark.svg", "/brand/aig_mark.svg", "/brand/aib_mark.svg", "/brand/aip_mark.svg"):
            tag = next(item for item in tags if f'src="{src}"' in item)
            self.assertIn('decoding="async"', tag)
            self.assertRegex(tag, r'width="\d+"')
            self.assertRegex(tag, r'height="\d+"')
            self.assertRegex(tag, r'alt="[^"]+"')

    def test_turnkey_and_diy_prices_stay_aligned(self) -> None:
        html = self.render({"view": "home", "stock": 2})
        self.assertIn("$499.00 USD", html)
        self.assertIn("DIY total: $297.00 USD", html)
        self.assertIn("[ Order Turnkey A:iG Appliance - $499 ]", html)
        self.assertIn("[ BUY A:iG APPLIANCE - $499 ]", html)
        self.assertIn("Open BOM ($297)", html)
        source = (APP / "src" / "components" / "DiyBomCalculator.tsx").read_text(encoding="utf-8")
        self.assertIn("PUBLISHED_DIY_CENTS = 29700", source)
        self.assertIn("TURNKEY_CENTS = 49900", source)
        self.assertEqual(49900, 499 * 100)
        self.assertEqual(29700, 297 * 100)
        self.assertEqual(499 - 297, 202)

    def test_seo_names_the_trifecta_and_keeps_the_product_offer(self) -> None:
        html = self.render({"view": "seo"})
        self.assertIn('rel="canonical" href="https://aix-core.com"', html)
        self.assertIn('property="og:description"', html)
        self.assertIn('name="twitter:description"', html)
        self.assertIn("A:iG", html)
        self.assertIn("A:iB", html)
        self.assertIn("A:iP", html)
        for term in KEYWORDS:
            self.assertIn(term, html)
        self.assertIn(
            "aix-core, autonomous grow room controller, indoor garden IoT, photoperiod interlock, sovereign edge compute",
            html,
        )
        match = re.search(r'<script type="application/ld\+json">(.*?)</script>', html)
        self.assertIsNotNone(match)
        data = json.loads(match.group(1))
        self.assertEqual(data["offers"]["price"], "499.00")
        self.assertEqual(data["name"], "Turnkey A:iG Appliance")

    def test_typecheck_exits_zero(self) -> None:
        npm = shutil.which("npm")
        if npm is None:
            self.skipTest("npm is required for the typecheck script")
        completed = subprocess.run(
            ["cmd", "/c", npm, "--prefix", str(APP), "run", "typecheck"],
            cwd=REPO_ROOT,
            capture_output=True,
            text=True,
            encoding="utf-8",
            check=False,
        )
        if completed.returncode != 0:
            self.fail(completed.stdout + completed.stderr)
        self.assertEqual(completed.returncode, 0)


if __name__ == "__main__":
    unittest.main()
