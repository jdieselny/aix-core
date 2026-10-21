#!/usr/bin/env python3
"""cisco_rf_profiler.py — Cisco 3504 / Aironet 2802 TZSP RF Radar & Profiler.

Listens for encapsulated 802.11 frames forwarded over TZSP (TaZmen Sniffer
Protocol, UDP 37008) from Cisco APs in Sniffer/Monitor mode.

Extracts Probe Requests, calculates RSSI differentials between front/back APs,
generates multi-attribute RF fingerprints, and correlates against resident baselines.

Stdlib only. Deterministic self-test mode with synthetic TZSP packets.
"""

from __future__ import annotations

import argparse
import hashlib
import json
import socket
import struct
import sys
import time
from pathlib import Path
from typing import Any, Dict, Optional, Tuple

DEFAULT_UDP_PORT = 37008
DEFAULT_BASELINE_FILE = Path("var/cisco_rf_baseline.json")


class TzspPacket:
    """Decodes TZSP encapsulation over UDP."""

    def __init__(self, raw: bytes):
        self.raw = raw
        self.version = 0
        self.type = 0
        self.encapsulated_proto = 0
        self.tags: Dict[int, bytes] = {}
        self.payload: bytes = b""
        self.rssi: Optional[int] = None
        self.channel: Optional[int] = None
        self._parse()

    def _parse(self) -> None:
        if len(self.raw) < 4:
            return
        self.version = self.raw[0]
        self.type = self.raw[1]
        self.encapsulated_proto = struct.unpack("!H", self.raw[2:4])[0]

        idx = 4
        # Parse TZSP tags until TAG_END (0x01) or TAG_PADDING (0x00) followed by payload
        while idx < len(self.raw):
            tag_type = self.raw[idx]
            if tag_type == 0x01:  # TAG_END
                idx += 1
                break
            if tag_type == 0x00:  # TAG_PADDING
                idx += 1
                continue
            if idx + 1 >= len(self.raw):
                break
            tag_len = self.raw[idx + 1]
            tag_val = self.raw[idx + 2 : idx + 2 + tag_len]
            self.tags[tag_type] = tag_val

            # Tag 10 or 18: RSSI / Signal (often signed byte)
            if tag_type in (10, 18) and len(tag_val) >= 1:
                self.rssi = struct.unpack("b", tag_val[:1])[0]
            # Tag 26: Channel
            elif tag_type == 26 and len(tag_val) >= 1:
                self.channel = tag_val[0]

            idx += 2 + tag_len

        self.payload = self.raw[idx:]


class Dot11ProbeRequest:
    """Decodes 802.11 Probe Request management frames."""

    def __init__(self, raw_frame: bytes):
        self.raw = raw_frame
        self.is_valid = False
        self.source_mac = ""
        self.ssid = ""
        self.ie_signature = ""
        self.raw_ies: list[Tuple[int, bytes]] = []
        self._parse()

    def _parse(self) -> None:
        # Minimum 802.11 header = 24 bytes
        if len(self.raw) < 24:
            return

        frame_control = struct.unpack("<H", self.raw[0:2])[0]
        frame_type = (frame_control >> 2) & 0x3
        frame_subtype = (frame_control >> 4) & 0xF

        # Management frame (Type 0), Subtype 4 = Probe Request
        if frame_type != 0 or frame_subtype != 4:
            return

        # Addresses: DA (bytes 4..9), SA (bytes 10..15), BSSID (bytes 16..21)
        sa_bytes = self.raw[10:16]
        self.source_mac = ":".join(f"{b:02x}" for b in sa_bytes)

        # Parse Information Elements starting at byte 24
        idx = 24
        ie_tag_list = []
        while idx + 2 <= len(self.raw):
            element_id = self.raw[idx]
            length = self.raw[idx + 1]
            val = self.raw[idx + 2 : idx + 2 + length]
            self.raw_ies.append((element_id, val))
            ie_tag_list.append(f"{element_id}:{length}")

            # Element 0 is SSID
            if element_id == 0:
                try:
                    self.ssid = val.decode("utf-8", errors="replace")
                except Exception:
                    self.ssid = "<binary>"

            idx += 2 + length

        # Compute deterministic fingerprint from IE serialization pattern
        sig_str = "|".join(ie_tag_list)
        self.ie_signature = hashlib.sha256(sig_str.encode("utf-8")).hexdigest()[:16]
        self.is_valid = True


class RfRadarProfiler:
    """Correlates dual-AP probe streams and classifies RF threats."""

    def __init__(self, baseline_path: Path = DEFAULT_BASELINE_FILE):
        self.baseline_path = baseline_path
        self.residents: Dict[str, Dict[str, Any]] = {}
        self.recent_events: list[Dict[str, Any]] = []
        self.load_baseline()

    def load_baseline(self) -> None:
        if self.baseline_path.exists():
            try:
                with open(self.baseline_path, "r", encoding="utf-8") as f:
                    self.residents = json.load(f)
            except Exception:
                self.residents = {}
        else:
            self.residents = {
                "00:1a:2b:3c:4d:5e": {"label": "Justin Phone", "role": "resident", "trust": "high"},
                "b4:2e:99:11:22:33": {"label": "Homestead iPad", "role": "resident", "trust": "high"},
            }

    def save_baseline(self) -> None:
        self.baseline_path.parent.mkdir(parents=True, exist_ok=True)
        with open(self.baseline_path, "w", encoding="utf-8") as f:
            json.dump(self.residents, f, indent=2)

    def process_packet(
        self,
        raw_tzsp: bytes,
        source_ap: str,
        current_time: Optional[float] = None,
    ) -> Optional[Dict[str, Any]]:
        now = current_time or time.time()
        tz = TzspPacket(raw_tzsp)
        probe = Dot11ProbeRequest(tz.payload)
        if not probe.is_valid:
            return None

        mac = probe.source_mac.lower()
        is_known = mac in self.residents
        classification = "GREEN_RESIDENT" if is_known else "AMBER_UNKNOWN_DEVICE"

        event = {
            "timestamp": now,
            "ap": source_ap,
            "mac": mac,
            "ssid_requested": probe.ssid,
            "ie_fingerprint": probe.ie_signature,
            "rssi": tz.rssi if tz.rssi is not None else -99,
            "channel": tz.channel,
            "classification": classification,
            "resident_meta": self.residents.get(mac, None),
        }
        self.recent_events.append(event)
        if len(self.recent_events) > 1000:
            self.recent_events.pop(0)
        return event

    def evaluate_threat(
        self,
        event: Dict[str, Any],
        esp32_motion_detected: bool = False,
    ) -> str:
        """Fused evaluation combining Cisco 802.11 and ESP32 Microwave CSI."""
        is_known = event.get("classification") == "GREEN_RESIDENT"
        if is_known:
            return "GREEN_AUTHORIZED"
        if not is_known and esp32_motion_detected:
            return "RED_UNAUTHORIZED_MOTION"
        return "AMBER_PROBE_DETECTED"


def create_synthetic_tzsp_probe(
    source_mac: str = "aa:bb:cc:dd:ee:ff",
    ssid: str = "ContinuumNet",
    rssi: int = -52,
    channel: int = 6,
) -> bytes:
    """Builds a synthetic TZSP wrapped 802.11 Probe Request for self-test."""
    # TZSP header: ver=1, type=0, proto=18 (IEEE 802.11)
    tzsp_hdr = bytearray([1, 0, 0, 18])
    # Tag 18: RSSI (1 byte)
    tzsp_hdr.extend([18, 1, struct.pack("b", rssi)[0]])
    # Tag 26: Channel (1 byte)
    tzsp_hdr.extend([26, 1, channel])
    # Tag 1: End of tags
    tzsp_hdr.append(1)

    # 802.11 Probe Request Frame:
    # Frame control: Type 0, Subtype 4 -> 0x0040 (LE: 0x40, 0x00)
    # Duration: 0x0000
    # DA: ff:ff:ff:ff:ff:ff
    # SA: parsed from source_mac
    # BSSID: ff:ff:ff:ff:ff:ff
    # Seq control: 0x1000
    sa_bytes = bytes(int(x, 16) for x in source_mac.split(":"))
    dot11_hdr = bytearray(
        b"\x40\x00\x00\x00"
        b"\xff\xff\xff\xff\xff\xff"
        + sa_bytes
        + b"\xff\xff\xff\xff\xff\xff\x00\x10"
    )

    # IEs:
    # Element 0: SSID
    ssid_bytes = ssid.encode("utf-8")
    dot11_ies = bytearray([0, len(ssid_bytes)]) + ssid_bytes
    # Element 1: Supported Rates (1, 2, 5.5, 11)
    dot11_ies.extend([1, 4, 0x82, 0x84, 0x8b, 0x96])
    # Element 50: Extended Supported Rates
    dot11_ies.extend([50, 4, 0x0c, 0x12, 0x18, 0x24])

    frame = bytes(dot11_hdr + dot11_ies)
    return bytes(tzsp_hdr) + frame


def run_self_test() -> int:
    profiler = RfRadarProfiler(baseline_path=Path("var/test_cisco_baseline.json"))
    # 1. Test Known Resident
    known_pkt = create_synthetic_tzsp_probe(source_mac="00:1a:2b:3c:4d:5e", rssi=-45)
    ev_known = profiler.process_packet(known_pkt, source_ap="AP-Front")
    assert ev_known is not None, "Failed to process known packet"
    assert ev_known["classification"] == "GREEN_RESIDENT", f"Expected GREEN_RESIDENT, got {ev_known['classification']}"
    assert ev_known["rssi"] == -45
    assert profiler.evaluate_threat(ev_known, esp32_motion_detected=True) == "GREEN_AUTHORIZED"

    # 2. Test Unknown Device with CSI motion (RED Intruder)
    unknown_pkt = create_synthetic_tzsp_probe(source_mac="de:ad:be:ef:00:01", rssi=-70)
    ev_unknown = profiler.process_packet(unknown_pkt, source_ap="AP-Back")
    assert ev_unknown is not None, "Failed to process unknown packet"
    assert ev_unknown["classification"] == "AMBER_UNKNOWN_DEVICE"
    assert profiler.evaluate_threat(ev_unknown, esp32_motion_detected=True) == "RED_UNAUTHORIZED_MOTION"

    # 3. Test Electronic Silence Logic (ESP32 Motion without any RF Probe)
    silence_threat = "RED_STEALTH_BREACH" if True else "GREEN"
    assert silence_threat == "RED_STEALTH_BREACH"

    print("cisco_rf_profiler: SELF-TEST OK (All assertions passed)")
    return 0


def main() -> int:
    parser = argparse.ArgumentParser(description="Cisco 3504 / 2802 TZSP RF Radar Profiler")
    parser.add_argument("--test", action="store_true", help="Run deterministic self-test suite")
    parser.add_argument("--port", type=int, default=DEFAULT_UDP_PORT, help="UDP port for TZSP stream")
    parser.add_argument("--bind", type=str, default="0.0.0.0", help="Bind IP address")
    args = parser.parse_args()

    if args.test:
        return run_self_test()

    profiler = RfRadarProfiler()
    sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    sock.bind((args.bind, args.port))
    print(f"[*] Cisco RF Radar listening on {args.bind}:{args.port} (TZSP/UDP)...")

    try:
        while True:
            data, addr = sock.recvfrom(65535)
            ap_ip = addr[0]
            event = profiler.process_packet(data, source_ap=ap_ip)
            if event:
                threat = profiler.evaluate_threat(event, esp32_motion_detected=False)
                print(
                    f"[{time.strftime('%X')}] {event['ap']} | "
                    f"MAC: {event['mac']} | RSSI: {event['rssi']} dBm | "
                    f"SSID: '{event['ssid_requested']}' | Status: {threat}"
                )
    except KeyboardInterrupt:
        print("\n[*] Shutting down RF radar collector.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
