import type { Metadata } from "next"
import { MachineManagementView } from "../../../components/MachineManagementView.js"

export const metadata: Metadata = {
  title: "Machine Management · Never Kill a Crop | A:iX Core",
  description:
    "Registered A:iG appliances, hardware UUID transfer, and the offline license bootstrapper. Local actuation stays on.",
}

export default function MachinesPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#0A0B0F",
        color: "#E7ECF3",
        padding: "clamp(1.5rem, 3vw, 4rem) clamp(1rem, 2vw, 2.5rem)",
        maxWidth: 960,
        margin: "0 auto",
      }}
    >
      <a href="/" style={{ color: "#FF334B", fontWeight: 700, textDecoration: "none" }}>
        ← BACK TO A:iX CORE APEX
      </a>
      <h1 style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)", margin: "1rem 0", color: "#34D399" }}>
        Machine Management
      </h1>
      <MachineManagementView />
    </main>
  )
}
