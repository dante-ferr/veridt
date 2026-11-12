export const REFRESH_COOKIE = 'veridt_refresh'
const COOKIE_PATH = '/v1/sessions'

export function serializeRefreshCookie(token: string, expiresAt: Date, now: Date, secure: boolean): string {
  const maxAge = Math.max(0, Math.floor((expiresAt.getTime() - now.getTime()) / 1000))
  return attributes(`${REFRESH_COOKIE}=${encodeURIComponent(token)}`, maxAge, secure)
}

export function clearRefreshCookie(secure: boolean): string {
  return attributes(`${REFRESH_COOKIE}=`, 0, secure)
}

export function readRefreshCookie(header: string | undefined): string | null {
  if (!header) return null
  for (const part of header.split(';')) {
    const separator = part.indexOf('=')
    if (separator < 0) continue
    if (part.slice(0, separator).trim() !== REFRESH_COOKIE) continue
    const value = part.slice(separator + 1).trim()
    if (!value) return null
    try {
      return decodeURIComponent(value)
    } catch {
      return null
    }
  }
  return null
}

function attributes(pair: string, maxAge: number, secure: boolean): string {
  const parts = [pair, `Path=${COOKIE_PATH}`, `Max-Age=${maxAge}`, 'HttpOnly', 'SameSite=Strict']
  if (secure) parts.push('Secure')
  return parts.join('; ')
}
