"""Contract tests for A:iX Documentation Center (/docs), datasheets, man pages, and ISR program."""

from __future__ import annotations

import json
import shutil
import subprocess
import unittest
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parents[1]
APP = REPO_ROOT / "apps" / "web"
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


class WebDocsContractTests(unittest.TestCase):
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

    def test_doc_sections_slugs_and_categories(self) -> None:
        payload = self.lib_json(
            """
            import { DOC_SECTIONS } from './dist/components/docs/DocsLayout.js'
            process.stdout.write(JSON.stringify({
              sections: DOC_SECTIONS,
              slugs: DOC_SECTIONS.map((s) => s.slug),
            }))
            """
        )
        expected_slugs = [
            "fast-start",
            "datasheet",
            "user-guide",
            "brochure",
            "man-pages",
            "release-notes",
            "isr-program",
        ]
        self.assertEqual(payload["slugs"], expected_slugs)
        self.assertEqual(len(payload["sections"]), 7)

    def test_doc_views_render_semantic_content(self) -> None:
        payload = self.lib_json(
            """
            import { createElement } from 'react'
            import { renderToStaticMarkup } from 'react-dom/server'
            import { DocsHomeView } from './dist/components/docs/DocsHomeView.js'
            import { DocsFastStartView } from './dist/components/docs/DocsFastStartView.js'
            import { DocsDatasheetView } from './dist/components/docs/DocsDatasheetView.js'
            import { DocsUserGuideView } from './dist/components/docs/DocsUserGuideView.js'
            import { DocsBrochureView } from './dist/components/docs/DocsBrochureView.js'
            import { DocsManPagesView } from './dist/components/docs/DocsManPagesView.js'
            import { DocsReleaseNotesView } from './dist/components/docs/DocsReleaseNotesView.js'
            import { DocsIsrProgramView } from './dist/components/docs/DocsIsrProgramView.js'

            process.stdout.write(JSON.stringify({
              home: renderToStaticMarkup(createElement(DocsHomeView)),
              fastStart: renderToStaticMarkup(createElement(DocsFastStartView)),
              datasheet: renderToStaticMarkup(createElement(DocsDatasheetView)),
              userGuide: renderToStaticMarkup(createElement(DocsUserGuideView)),
              brochure: renderToStaticMarkup(createElement(DocsBrochureView)),
              manPages: renderToStaticMarkup(createElement(DocsManPagesView)),
              releaseNotes: renderToStaticMarkup(createElement(DocsReleaseNotesView)),
              isrProgram: renderToStaticMarkup(createElement(DocsIsrProgramView)),
            }))
            """
        )

        # 1. Home
        home = payload["home"]
        self.assertIn("A:iX Technical Documentation &amp; Field Manuals", home)
        self.assertIn("Core Sovereign Architecture Laws", home)

        # 2. Fast-Start
        fast = payload["fastStart"]
        self.assertIn("Fast-Start Guide", fast)
        self.assertIn("Chernobyl 95°F Snap-Action Mechanical Contactor", fast)
        self.assertIn("Sensirion SHT45 Sniffer Pod", fast)
        self.assertIn("Tactical Field Provisioning Pass", fast)

        # 3. Datasheet
        sheet = payload["datasheet"]
        self.assertIn("Intel Alder Lake-N N100", sheet)
        self.assertIn("16GB DDR5", sheet)
        self.assertIn("512GB M.2 NVMe", sheet)
        self.assertIn("Dual 2.5GbE RJ45", sheet)
        self.assertIn("±1.5% RH", sheet)
        self.assertIn("Senseair S8", sheet)

        # 4. User Guide
        guide = payload["userGuide"]
        self.assertIn("Closed-Loop Vapor Pressure Deficit", guide)
        self.assertIn("423 Photoperiod Lock Law", guide)
        self.assertIn("52-Subcarrier CSI Microwave Presence", guide)

        # 5. Brochure
        brochure = payload["brochure"]
        self.assertIn("$499", brochure)
        self.assertIn("$297", brochure)
        self.assertIn("62%", brochure)
        self.assertIn("A:iG (Agent-In-Garden)", brochure)
        self.assertIn("A:iB (Agent-In-Body)", brochure)

        # 6. Man Pages
        man = payload["manPages"]
        self.assertIn("AIGCTL(1)", man)
        self.assertIn("AIP(1)", man)
        self.assertIn("WATCHTOWER(1)", man)
        self.assertIn("TZSP probe frames", man)

        # 7. Release Notes
        notes = payload["releaseNotes"]
        self.assertIn("v1.0.0 — Commercial Apex Release", notes)
        self.assertIn("Interactive 5-Pin Hardware Inspector", notes)

        # 8. ISR Program
        isr = payload["isrProgram"]
        self.assertIn("The ISR Program: Seeds &amp; Industrial Controls Flywheel", isr)
        self.assertIn("Do Your Thing Twin", isr)
        self.assertIn("jdieselny.com", isr)
        self.assertIn("Free App with Seeds", isr)
        self.assertIn("10% Cash ($49.90 / A:iG unit)", isr)

        # Assert no tracking scripts in any doc view
        for key, html in payload.items():
            lowered = html.lower()
            for tracker in TRACKERS:
                self.assertNotIn(tracker, lowered, f"Tracker {tracker} found in {key}")


if __name__ == "__main__":
    unittest.main()
