import { readFileSync } from "node:fs"
import { join } from "node:path"

export async function GET() {
  try {
    const filePath = join(process.cwd(), "apps", "web", "public", "llms.txt")
    const content = readFileSync(filePath, "utf-8")
    return new Response(content, {
      status: 200,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "public, max-age=3600, s-maxage=86400",
      },
    })
  } catch {
    const fallbackPath = join(process.cwd(), "public", "llms.txt")
    const content = readFileSync(fallbackPath, "utf-8")
    return new Response(content, {
      status: 200,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "public, max-age=3600, s-maxage=86400",
      },
    })
  }
}
