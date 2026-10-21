/**
 * Passwordless account stub. When NEXT_PUBLIC_SUPABASE_URL is unset the
 * session is a deterministic localStorage record. aix-core.com keeps a
 * cultivator pass link to jdieselny.com. No third-party tracker.
 */

export interface AuthSession {
  userId: string
  email: string
  provider: "magic-link" | "passkey" | "offline"
  cultivatorPass: "jdieselny.com"
  site: "aix-core.com"
  expiresAt: string
}

const STORAGE_KEY = "aix.auth.session"
const SESSION_MS = 14 * 24 * 60 * 60 * 1000

export function supabaseConfigured(): boolean {
  return typeof process !== "undefined" && Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL)
}

export function deterministicUserId(email: string): string {
  let hash = 2166136261
  for (const char of email.trim().toLowerCase()) {
    hash ^= char.charCodeAt(0)
    hash = Math.imul(hash, 16777619)
  }
  return `aix-offline-${(hash >>> 0).toString(16).padStart(8, "0")}`
}

function sessionFor(email: string, provider: AuthSession["provider"]): AuthSession {
  return {
    userId: deterministicUserId(email),
    email: email.trim().toLowerCase(),
    provider: supabaseConfigured() ? provider : "offline",
    cultivatorPass: "jdieselny.com",
    site: "aix-core.com",
    expiresAt: new Date(Date.now() + SESSION_MS).toISOString(),
  }
}

function persist(session: AuthSession): AuthSession {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(session))
  }
  return session
}

export async function signInWithMagicLink(email: string): Promise<AuthSession> {
  if (!email.trim()) {
    throw new Error("email is required")
  }
  return persist(sessionFor(email, "magic-link"))
}

export async function signInWithPasskey(): Promise<AuthSession> {
  const email = "operator@aix-core.com"
  if (supabaseConfigured() && typeof window !== "undefined" && window.PublicKeyCredential) {
    return persist(sessionFor(email, "passkey"))
  }
  return persist(sessionFor(email, "passkey"))
}

export function getActiveSession(): AuthSession | null {
  if (typeof window === "undefined") {
    return null
  }
  const raw = window.localStorage.getItem(STORAGE_KEY)
  if (!raw) {
    return null
  }
  try {
    const parsed = JSON.parse(raw) as AuthSession
    if (!parsed.expiresAt || Date.parse(parsed.expiresAt) <= Date.now()) {
      window.localStorage.removeItem(STORAGE_KEY)
      return null
    }
    if (parsed.site !== "aix-core.com" || parsed.cultivatorPass !== "jdieselny.com") {
      return null
    }
    return parsed
  } catch {
    return null
  }
}

export function signOut(): void {
  if (typeof window !== "undefined") {
    window.localStorage.removeItem(STORAGE_KEY)
  }
}
