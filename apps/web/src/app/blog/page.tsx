import React from "react"
import { BlogIndexView } from "../../components/BlogIndexView.js"

export const metadata = {
  title: "Technical Dispatches & Engineering Journal — A:iX Core",
  description:
    "Authoritative documentation, hardware schematics, and thermodynamic analyses for sovereign agricultural edge computing.",
}

export default function BlogPage() {
  return <BlogIndexView />
}
