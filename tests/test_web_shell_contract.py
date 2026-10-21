"""Render contract for commercial web Wave 1.

Header, sister banner, shelf pill, and LCP hero. No tracker scripts.
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
TOKENS = APP / "src" / "styles" / "tokens.css"
SRC = APP / "src"

IN_STOCK = "[2 UNITS PRE-ASSEMBLED &amp; BURNED IN — SHIPS IN 24H]"
LOW_STOCK = "[ONLY 1 UNIT LEFT ON SHELF — SHIPS TODAY]"
BACKORDER = "[BUILT TO ORDER — SHIPS IN 4-6 BUSINESS DAYS]"
TRACKERS = (
    "googletagmanager",
    "google-analytics",
    "facebook.net",
    "connect.facebook",
    "hotjar",
    "segment.com",
    "doubleclick",
    "gtag(",
    "fbq(",
    "plausible.io",
)


class WebShellContractTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls) -> None:
        if NODE is None:
            raise unittest.SkipTest("node is required to render the web shell")
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

    def render(self, stock: int) -> str:
        completed = subprocess.run(
            [NODE, str(RENDER)],
            input=json.dumps({"stock": stock}),
            capture_output=True,
            encoding="utf-8",
            check=False,
        )
        if completed.returncode != 0:
            self.fail(completed.stderr or completed.stdout)
        return completed.stdout

    def test_tokens_carry_the_glass_palette(self) -> None:
        css = TOKENS.read_text(encoding="utf-8")
        for token in (
            "#0A0B0F",
            "rgba(18, 20, 28, 0.72)",
            "blur(18px)",
            "#34D399",
            "#38BDF8",
            "#FBBF24",
            "#F87171",
            "JetBrains Mono",
            "DM Sans",
            "Inter",
            "clamp(",
            "@container",
            "scrollbar-gutter: stable",
        ):
            self.assertIn(token, css)

    def test_header_brand_links_and_sister_bridge(self) -> None:
        html = self.render(2)
        self.assertIn("A:iX CORE", html)
        self.assertIn('data-pip="cyan"', html)
        self.assertIn("#38BDF8", html)
        self.assertIn(">Hardware<", html)
        self.assertIn('href="/hardware/core"', html)
        self.assertIn(">DIY Calculator<", html)
        self.assertIn('href="/docs/diy-calculator"', html)
        self.assertIn(">Compare<", html)
        self.assertIn('href="/compare"', html)
        self.assertIn(">Docs<", html)
        self.assertIn('href="/docs"', html)
        self.assertIn(">Seeds (jdieselny)<", html)
        self.assertIn('href="https://jdieselny.com"', html)
        self.assertIn("Quick Cart · 1-Tap", html)
        self.assertIn('data-cart="drawer"', html)
        self.assertIn('data-sister="banner"', html)
        self.assertIn("POWERED BY J DIESEL NY GENETICS · GET MEDICAL-GRADE FEMINIZED SEEDS →", html)
        self.assertIn('data-badge="seed"', html)
        self.assertIn("#34D399", html)

    def test_inventory_pill_formats_the_two_box_buffer(self) -> None:
        ready = self.render(2)
        self.assertIn(IN_STOCK, ready)
        self.assertIn('data-inventory="IN_STOCK"', ready)
        self.assertIn("#34D399", ready)
        extra = self.render(5)
        self.assertIn(IN_STOCK, extra)
        self.assertIn('data-stock="5"', extra)
        low = self.render(1)
        self.assertIn(LOW_STOCK, low)
        self.assertIn('data-inventory="LOW_STOCK"', low)
        self.assertIn("#FBBF24", low)
        self.assertNotIn("SHIPS IN 24H", low)
        empty = self.render(0)
        self.assertIn(BACKORDER, empty)
        self.assertIn('data-inventory="BACKORDER"', empty)
        self.assertIn("#38BDF8", empty)
        self.assertNotIn("SHIPS IN 24H", empty)
        self.assertNotIn("SHIPS TODAY", empty)

    def test_hero_is_the_lcp_candidate(self) -> None:
        html = self.render(2)
        self.assertIn('data-hero="lcp"', html)
        self.assertIn('fetchpriority="high"', html)
        self.assertIn('src="/hardware/aig_appliance_hero.jpg"', html)
        self.assertIn('alt="A:iG Autonomous Edge Cultivation Appliance"', html)
        self.assertIn('width="1376"', html)
        self.assertIn('height="768"', html)
        self.assertIn("aspect-ratio:1376 / 768", html)
        self.assertIn("scrollbar-gutter:stable", html)
        self.assertNotIn('loading="lazy"', html)
        self.assertNotIn("loading='lazy'", html)

    def test_shell_has_no_surveillance_scripts(self) -> None:
        html = self.render(2).lower()
        self.assertNotIn("<script", html)
        blob = html
        for path in SRC.rglob("*"):
            if path.is_file() and path.suffix in {".ts", ".tsx", ".css"}:
                blob += "\n" + path.read_text(encoding="utf-8").lower()
        for tracker in TRACKERS:
            self.assertNotIn(tracker, blob)


if __name__ == "__main__":
    unittest.main()
