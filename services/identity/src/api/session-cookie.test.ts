import { describe, expect, it } from 'vitest'
import { clearRefreshCookie, readRefreshCookie, serializeRefreshCookie } from './session-cookie'

describe('refresh cookie', () => {
  const now = new Date('2026-11-12T12:00:00Z')
  const expiresAt = new Date('2026-11-19T12:00:00Z')

  it('serializes an httpOnly, strict cookie scoped to the session routes', () => {
    const cookie = serializeRefreshCookie('abc', expiresAt, now, false)
    expect(cookie).toBe('veridt_refresh=abc; Path=/v1/sessions; Max-Age=604800; HttpOnly; SameSite=Strict')
  })

  it('adds Secure when configured', () => {
    expect(serializeRefreshCookie('abc', expiresAt, now, true)).toContain('; Secure')
  })

  it('clears the cookie with Max-Age=0', () => {
    expect(clearRefreshCookie(false)).toBe('veridt_refresh=; Path=/v1/sessions; Max-Age=0; HttpOnly; SameSite=Strict')
  })

  it('reads the token among other cookies', () => {
    expect(readRefreshCookie('a=1; veridt_refresh=tok%2Ben; b=2')).toBe('tok+en')
  })

  it('returns null when the cookie is missing or empty', () => {
    expect(readRefreshCookie(undefined)).toBeNull()
    expect(readRefreshCookie('a=1')).toBeNull()
    expect(readRefreshCookie('veridt_refresh=')).toBeNull()
  })
})
