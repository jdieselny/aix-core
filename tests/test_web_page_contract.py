"""Render contract for the assembled aix-core.com storefront."""

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


class WebPageContractTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls) -> None:
        if NODE is None:
            raise unittest.SkipTest("node is required to render the storefront")
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

    def render_home(self) -> str:
        completed = subprocess.run(
            [NODE, str(RENDER)],
            input=json.dumps({"view": "home", "stock": 2}),
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

    def test_home_mounts_every_section(self) -> None:
        html = self.render_home()
        self.assertIn('data-page="home"', html)
        self.assertEqual(html.count('data-sister="banner"'), 1)
        self.assertIn('data-header="site"', html)
        self.assertIn('data-inventory="IN_STOCK"', html)
        self.assertIn('data-hero="lcp"', html)
        self.assertIn('fetchpriority="high"', html)
        hero = re.search(r'<img\b[^>]*fetchpriority="high"[^>]*>', html)
        self.assertIsNotNone(hero)
        self.assertNotIn("loading=", hero.group(0))
        self.assertIn('loading="lazy"', html)
        for marker in (
            'data-product="continuum-core"',
            'data-product="sniffer-pod"',
            'data-product="chernobyl-switch"',
            'data-product="op2026-bundle"',
            'data-calculator="diy-bom"',
            'data-matrix="competitors"',
            'data-testbed="marty"',
            'data-portal="billing"',
            'data-drawer="checkout"',
            'data-footer="site"',
        ):
            self.assertIn(marker, html)
        self.assertIn("Turnkey A:iG Appliance", html)
        self.assertIn("[ BUY A:iG APPLIANCE - $499 ]", html)
        self.assertIn("A:iP Mobile Cockpit", html)
        self.assertIn("$499.00", html)
        self.assertIn('id="checkout-open"', html)
        self.assertIn('for="checkout-open"', html)
        self.assertIn('href="https://jdieselny.com"', html)
        self.assertIn('href="https://jdieselny.com/?ref=aix-core-bundle"', html)
        match = re.search(r'<script type="application/ld\+json">(.*?)</script>', html)
        self.assertIsNotNone(match)
        data = json.loads(match.group(1))
        self.assertEqual(data["@type"], "Product")
        self.assertEqual(data["name"], "Turnkey A:iG Appliance")
        self.assertEqual(data["offers"]["price"], "499.00")
        self.assertIn("https://aix-core.com", json.dumps(data))
        lowered = html.lower()
        for tracker in TRACKERS:
            self.assertNotIn(tracker, lowered)

    def test_sitemap_and_robots_configurations(self) -> None:
        payload = self.lib_json(
            """
            import sitemap, { sitemapXml } from './dist/app/sitemap.js'
            import robots, { robotsTxt } from './dist/app/robots.js'
            process.stdout.write(JSON.stringify({
              urls: sitemap().map((entry) => entry.url),
              xml: sitemapXml(),
              robots: robots(),
              txt: robotsTxt(),
            }))
            """
        )
        self.assertEqual(
            payload["urls"],
            [
                "https://aix-core.com",
                "https://aix-core.com/hardware/core",
                "https://aix-core.com/compare",
                "https://aix-core.com/diy",
                "https://aix-core.com/blog",
                "https://aix-core.com/blog/death-of-cloud-grow-controllers-autonomous-sovereign-ai-hardware",
                "https://aix-core.com/docs",
                "https://aix-core.com/docs/fast-start",
                "https://aix-core.com/docs/datasheet",
                "https://aix-core.com/docs/user-guide",
                "https://aix-core.com/docs/brochure",
                "https://aix-core.com/docs/man-pages",
                "https://aix-core.com/docs/release-notes",
                "https://aix-core.com/docs/isr-program",
            ],
        )
        for url in payload["urls"]:
            self.assertIn(f"<loc>{url}</loc>", payload["xml"])
        self.assertEqual(payload["robots"]["rules"]["userAgent"], "*")
        self.assertEqual(payload["robots"]["rules"]["allow"], "/")
        self.assertEqual(payload["robots"]["sitemap"], "https://aix-core.com/sitemap.xml")
        self.assertIn("User-agent: *\nAllow: /\nSitemap: https://aix-core.com/sitemap.xml\n", payload["txt"])

    def test_root_layout_exports_the_document_shell(self) -> None:
        source = (APP / "src" / "app" / "layout.tsx").read_text(encoding="utf-8")
        self.assertIn('import "../styles/tokens.css"', source)
        self.assertIn("export default function RootLayout", source)
        self.assertIn('lang="en"', source)
        self.assertIn('charSet="utf-8"', source)
        self.assertIn('name="viewport"', source)
        self.assertIn('content="width=device-width, initial-scale=1"', source)
        self.assertIn('href="/favicon.ico"', source)
        self.assertIn('background: "#0A0B0F"', source)
        self.assertIn('color: "#E7ECF3"', source)
        compiled = (APP / "dist" / "app" / "layout.js").read_text(encoding="utf-8")
        self.assertIn("RootLayout", compiled)
        package = json.loads((APP / "package.json").read_text(encoding="utf-8"))
        self.assertTrue(str(package["dependencies"]["next"]).startswith("^15") or str(package["dependencies"]["next"]).startswith("15"))
        self.assertEqual(package["scripts"]["dev"], "next dev")
        self.assertEqual(package["scripts"]["build"], "next build")
        self.assertEqual(package["scripts"]["start"], "next start")
        self.assertEqual(package["scripts"]["typecheck"], "tsc -p tsconfig.json --noEmit")
        self.assertEqual(package["scripts"]["test:render"], "tsc -p tsconfig.json")


if __name__ == "__main__":
    unittest.main()
