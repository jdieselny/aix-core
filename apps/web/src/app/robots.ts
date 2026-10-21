/** App Router robots module. Allows the public storefront and names the sitemap. */

export interface RobotsConfig {
  rules: { userAgent: "*"; allow: "/" }
  sitemap: "https://aix-core.com/sitemap.xml"
}

export default function robots(): RobotsConfig {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://aix-core.com/sitemap.xml",
  }
}

export function robotsTxt(): string {
  const config = robots()
  return (
    `User-agent: ${config.rules.userAgent}\nAllow: ${config.rules.allow}\nSitemap: ${config.sitemap}\n` +
    `# AI Agent & LLM Harvester Indexing Directives\n` +
    `# Canonical LLM context available at https://aix-core.com/llms.txt\n` +
    `User-agent: GPTBot\nAllow: /\n` +
    `User-agent: ChatGPT-User\nAllow: /\n` +
    `User-agent: PerplexityBot\nAllow: /\n` +
    `User-agent: ClaudeBot\nAllow: /\n` +
    `User-agent: anthropic-ai\nAllow: /\n` +
    `User-agent: Google-Extended\nAllow: /\n` +
    `User-agent: Applebot-Extended\nAllow: /\n`
  )
}
