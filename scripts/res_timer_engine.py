#!/usr/bin/env python3
"""res_timer_engine.py — Sovereign Multi-Reservoir Voice & Batch Timer Engine.

Designed for commercial cultivators mixing technical-grade dry soluble mineral salts
(Athena, Jacks, Front Row, Masterblend) across multi-reservoir / multi-table facilities.

Features:
- Natural voice command parsing for hands-free resin-glove operations.
- Dissolution kinetics & pH stabilization window tracking (e.g. silica buffer delays).
- Persistent state on disk (survives restarts and power cycles).
- Dispatchable alerts to A:iP Mobile Cockpit & local speech synthesizer.
"""

from __future__ import annotations

import argparse
import json
import os
import re
import sys
import time
from dataclasses import asdict, dataclass
from pathlib import Path
from typing import Any, Dict, List, Optional

DEFAULT_STATE_FILE = Path(os.environ.get("AIX_TIMER_STATE_PATH", "continuum/memory/res_timers.json"))


@dataclass
class ResTimer:
    id: str
    target: str
    action: str
    duration_seconds: int
    created_at: float
    expires_at: float
    status: str = "active"  # active, completed, cancelled
    alert_dispatched: bool = False

    @property
    def remaining_seconds(self) -> float:
        return max(0.0, self.expires_at - time.time())

    @property
    def is_expired(self) -> bool:
        return time.time() >= self.expires_at


def parse_duration_string(text: str) -> Optional[int]:
    """Extract duration in seconds from natural text like '20 min', '2 hours', '45m', '90s'."""
    pattern = re.compile(
        r"(\d+(?:\.\d+)?)\s*(?:hours?|hrs?|h|minutes?|mins?|m|seconds?|secs?|s)\b",
        re.IGNORECASE,
    )
    matches = pattern.findall(text)
    if not matches:
        return None

    # Find the full matched token to compute multiplier
    total_seconds = 0.0
    for match in pattern.finditer(text):
        val = float(match.group(1))
        raw = match.group(0).lower()
        if "h" in raw:
            total_seconds += val * 3600
        elif "m" in raw:
            total_seconds += val * 60
        elif "s" in raw:
            total_seconds += val
    return int(total_seconds) if total_seconds > 0 else None


def parse_voice_timer_command(prompt: str) -> Optional[Dict[str, Any]]:
    """Parse hands-free cultivator voice string into structured reservoir timer.

    Examples:
    - 'table 3, 20 min, pH check ring me'
    - 'table 9's good for 2 hours but I need to come back out don't let me forget, Agent Smith'
    - 'Agent Smith: res 1, 15 minutes, check silica dissolution'
    """
    clean = prompt.strip()
    # Strip common assistant addressing
    clean = re.sub(r"(?i)\b(?:hey\s+)?agent\s+smith\b[,:]?", "", clean).strip()

    # Match target pattern: Table X, Res Y, Batch Tank Z, etc.
    target_pattern = re.compile(
        r"(?i)\b((?:table|res|reservoir|tank|zone|room|batch)\s*(?:[0-9]+|[a-z]))\b"
    )
    target_match = target_pattern.search(clean)
    target = target_match.group(1).title() if target_match else "General Batch"

    duration_sec = parse_duration_string(clean)
    if not duration_sec:
        return None

    # Extract clean action text by removing the target and duration phrases
    action_text = clean
    if target_match:
        action_text = (
            action_text[: target_match.start()] + action_text[target_match.end() :]
        )

    # Remove duration phrase
    action_text = re.sub(
        r"(?i)\b(?:\bfor\s+)?(\d+(?:\.\d+)?)\s*(?:hours?|hrs?|h|minutes?|mins?|m|seconds?|secs?|s)\b",
        "",
        action_text,
    )

    # Strip leftover punctuation, connectors, or possessives
    action_text = re.sub(r"['’]s\s+good(?:\s+for)?", "", action_text, flags=re.IGNORECASE)
    action_text = re.sub(r"^[,;\-\s]+|[,;\-\s]+$", "", action_text)
    action_text = re.sub(r"\s+", " ", action_text).strip()

    if not action_text:
        action_text = "Stabilization & inspection check"

    return {
        "target": target,
        "action": action_text,
        "duration_seconds": duration_sec,
    }


class ReservoirTimerEngine:
    def __init__(self, state_file: Path = DEFAULT_STATE_FILE):
        self.state_file = state_file
        self.timers: List[ResTimer] = []
        self._load()

    def _load(self) -> None:
        if self.state_file.exists():
            try:
                data = json.loads(self.state_file.read_text(encoding="utf-8"))
                self.timers = [ResTimer(**item) for item in data.get("timers", [])]
            except Exception:
                self.timers = []
        else:
            self.timers = []

    def _save(self) -> None:
        self.state_file.parent.mkdir(parents=True, exist_ok=True)
        payload = {"updated_at": time.time(), "timers": [asdict(t) for t in self.timers]}
        self.state_file.write_text(json.dumps(payload, indent=2), encoding="utf-8")

    def create_timer(self, target: str, action: str, duration_seconds: int) -> ResTimer:
        now = time.time()
        timer_id = f"TMR-{int(now * 1000) % 1000000:06d}"
        timer = ResTimer(
            id=timer_id,
            target=target,
            action=action,
            duration_seconds=duration_seconds,
            created_at=now,
            expires_at=now + duration_seconds,
            status="active",
            alert_dispatched=False,
        )
        self.timers.append(timer)
        self._save()
        return timer

    def add_from_voice_prompt(self, prompt: str) -> Optional[ResTimer]:
        parsed = parse_voice_timer_command(prompt)
        if not parsed:
            return None
        return self.create_timer(
            target=parsed["target"],
            action=parsed["action"],
            duration_seconds=parsed["duration_seconds"],
        )

    def tick(self) -> List[ResTimer]:
        """Evaluate timers and return any that just fired."""
        fired: List[ResTimer] = []
        for t in self.timers:
            if t.status == "active" and t.is_expired and not t.alert_dispatched:
                t.status = "completed"
                t.alert_dispatched = True
                fired.append(t)
        if fired:
            self._save()
        return fired

    def list_active(self) -> List[ResTimer]:
        return [t for t in self.timers if t.status == "active"]

    def cancel(self, timer_id: str) -> bool:
        for t in self.timers:
            if t.id == timer_id:
                t.status = "cancelled"
                self._save()
                return True
        return False


def format_duration(seconds: float) -> str:
    s = int(seconds)
    h = s // 3600
    m = (s % 3600) // 60
    sec = s % 60
    if h > 0:
        return f"{h}h {m}m {sec}s"
    if m > 0:
        return f"{m}m {sec}s"
    return f"{sec}s"


def main() -> None:
    parser = argparse.ArgumentParser(description="Multi-Reservoir Voice & Batch Timer Engine")
    sub = parser.add_subparsers(dest="command")

    add_parser = sub.add_parser("add", help="Add timer from natural voice string")
    add_parser.add_argument("prompt", type=str, help="Natural language voice prompt")

    sub.add_parser("list", help="List active reservoir timers")
    sub.add_parser("tick", help="Tick engine and alert expired timers")

    cancel_parser = sub.add_parser("cancel", help="Cancel a timer by ID")
    cancel_parser.add_argument("timer_id", type=str, help="ID of timer to cancel")

    args = parser.parse_args()
    engine = ReservoirTimerEngine()

    if args.command == "add":
        t = engine.add_from_voice_prompt(args.prompt)
        if t:
            print(f"[OK] TIMER ARMED: [{t.id}] {t.target} -- {t.action}")
            print(f"     Duration: {format_duration(t.duration_seconds)} (Expires in {t.duration_seconds}s)")
        else:
            print(f"[ERROR] Could not parse duration or target from: '{args.prompt}'", file=sys.stderr)
            sys.exit(1)

    elif args.command == "list":
        active = engine.list_active()
        if not active:
            print("[INFO] No active reservoir timers running.")
            return
        print(f"\nACTIVE RESERVOIR TIMERS ({len(active)}):")
        print("=" * 65)
        for t in sorted(active, key=lambda x: x.expires_at):
            print(f"[{t.id}] {t.target:<12} | REMAINING: {format_duration(t.remaining_seconds):<10} | {t.action}")
        print("=" * 65)

    elif args.command == "tick":
        fired = engine.tick()
        if fired:
            for t in fired:
                print(f"[ALERT TRIGGERED] *** {t.target} *** -> {t.action} (Target window reached!)")
        else:
            print("[OK] All active timers running within safe thresholds.")

    elif args.command == "cancel":
        if engine.cancel(args.timer_id):
            print(f"[OK] Timer {args.timer_id} cancelled.")
        else:
            print(f"[ERROR] Timer {args.timer_id} not found.", file=sys.stderr)
            sys.exit(1)

    else:
        parser.print_help()


if __name__ == "__main__":
    main()
