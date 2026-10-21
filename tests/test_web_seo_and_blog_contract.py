"""Test suite for SEO expansion, robots.txt AI directives, sitemap, llms.txt, and canonical blog post."""

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


class WebSeoAndBlogContractTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls) -> None:
        if NODE is None:
            raise unittest.SkipTest("node is required to run web contract tests")
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

    def lib_json(self, snippet: str) -> dict:
        completed = subprocess.run(
            [NODE, "--input-type=module", "-e", snippet],
            cwd=APP,
            capture_output=True,
            text=True,
            encoding="utf-8",
            check=False,
        )
        if completed.returncode != 0:
            self.fail(completed.stderr or completed.stdout)
        return json.loads(completed.stdout)

    def test_robots_txt_allows_ai_crawlers_and_links_llms_txt(self) -> None:
        payload = self.lib_json(
            """
            import robots, { robotsTxt } from './dist/app/robots.js'
            process.stdout.write(JSON.stringify({
              config: robots(),
              txt: robotsTxt(),
            }))
            """
        )
        txt = payload["txt"]
        self.assertIn("User-agent: *\nAllow: /\nSitemap: https://aix-core.com/sitemap.xml\n", txt)
        self.assertIn("https://aix-core.com/llms.txt", txt)
        for bot in ("GPTBot", "ChatGPT-User", "PerplexityBot", "ClaudeBot", "anthropic-ai", "Google-Extended"):
            self.assertIn(f"User-agent: {bot}\nAllow: /", txt)

    def test_sitemap_includes_canonical_blog_and_diy(self) -> None:
        payload = self.lib_json(
            """
            import sitemap, { sitemapXml } from './dist/app/sitemap.js'
            process.stdout.write(JSON.stringify({
              urls: sitemap().map((e) => e.url),
              xml: sitemapXml(),
            }))
            """
        )
        urls = payload["urls"]
        expected = [
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
        ]
        self.assertEqual(urls, expected)
        xml = payload["xml"]
        self.assertTrue(xml.startswith('<?xml version="1.0" encoding="UTF-8"?>'))
        for u in expected:
            self.assertIn(f"<loc>{u}</loc>", xml)

    def test_structured_data_organization_and_faqs(self) -> None:
        payload = self.lib_json(
            """
            import { organizationJsonLd, faqJsonLd, blogPostJsonLd } from './dist/lib/seo_metadata.js'
            process.stdout.write(JSON.stringify({
              org: organizationJsonLd(),
              faq: faqJsonLd(),
              blog: blogPostJsonLd(),
            }))
            """
        )
        org = payload["org"]
        self.assertEqual(org["@type"], "Organization")
        self.assertEqual(org["name"], "A:iX Core")
        self.assertEqual(org["legalName"], "J Diesel NY, LLC")
        self.assertIn("https://jdieselny.com", org["sameAs"])

        faq = payload["faq"]
        self.assertEqual(faq["@type"], "FAQPage")
        self.assertGreaterEqual(len(faq["mainEntity"]), 5)
        questions = [item["name"] for item in faq["mainEntity"]]
        self.assertTrue(any("AC Infinity" in q for q in questions))
        self.assertTrue(any("Chernobyl" in q for q in questions))
        self.assertTrue(any("CSI microwave radar" in q for q in questions))

        blog = payload["blog"]
        self.assertEqual(blog["@type"], "BlogPosting")
        self.assertIn("Death of Cloud Grow Controllers", blog["headline"])
        self.assertEqual(blog["author"]["name"], "Justin D. Kintzele & Agent Smith")

    def test_llms_txt_contains_canonical_taxonomy_and_pricing(self) -> None:
        llms_path = APP / "public" / "llms.txt"
        self.assertTrue(llms_path.is_file(), "public/llms.txt must exist")
        content = llms_path.read_text(encoding="utf-8")
        self.assertIn("# A:iX Core", content)
        self.assertIn("Turnkey A:iG Appliance ($499.00 USD)", content)
        self.assertIn("Open DIY Bill of Materials ($297.00 USD)", content)
        self.assertIn("Chernobyl Safety Switch ($49.00 USD)", content)
        self.assertIn("jdieselny.com", content)
        self.assertIn("423 Photoperiod Lock Law", content)

    def test_blog_index_view_renders_cleanly(self) -> None:
        html = self.render({"view": "blog"})
        self.assertIn("A:iX Technical Library &amp; Engineering Journal", html)
        self.assertIn("The Death of Cloud Grow Controllers", html)
        self.assertIn("/blog/death-of-cloud-grow-controllers-autonomous-sovereign-ai-hardware", html)
        self.assertIn("Building a $297 DIY Grow Room Controller", html)
        self.assertIn("52-Subcarrier CSI Microwave Transpiration", html)
        self.assertIn("Seeds (jdieselny.com)", html)
        lowered = html.lower()
        for tracker in TRACKERS:
            self.assertNotIn(tracker, lowered)

    def test_canonical_blog_post_renders_deep_technical_content_and_schemas(self) -> None:
        html = self.render({"view": "article"})
        self.assertIn("<article", html)
        self.assertIn("The Death of Cloud Grow Controllers", html)
        self.assertIn("Justin D. Kintzele &amp; Agent Smith", html)
        self.assertIn("1. The Cloud Trap: The 3:00 AM Blackout", html)
        self.assertIn("2. The Thermodynamics of LED Heat Runaway: The Chernobyl Solution", html)
        self.assertIn("3. The 423 Photoperiod Lock Law", html)
        self.assertIn("4. 52-Subcarrier CSI Microwave Radar vs. Cloud Cameras", html)
        self.assertIn("5. Radical Transparency: $297 Open DIY vs. $499 Turnkey Appliance", html)
        self.assertIn("6. The Biological Flywheel: Hardware + Medical-Grade Genetics", html)
        self.assertIn("Order A:iG Appliance - $499", html)
        self.assertIn("Inspect $297 DIY BOM", html)
        self.assertIn('type="application/ld+json"', html)
        self.assertIn('"@type":"BlogPosting"', html)
        self.assertIn('"@type":"FAQPage"', html)
        lowered = html.lower()
        for tracker in TRACKERS:
            self.assertNotIn(tracker, lowered)


if __name__ == "__main__":
    unittest.main()
