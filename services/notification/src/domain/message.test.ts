import { describe, expect, it } from 'vitest'
import type { EmailEvent } from '@veridt/events'
import { buildMessage } from './message'

const accountId = '11111111-1111-4111-8111-111111111111'
const eventId = '4f0b1a0e-6d2c-4a1e-9b55-0c2a6d9e1f10'

describe('outbound email', () => {
  it('builds a one-time confirmation link', () => {
    const event: EmailEvent = {
      type: 'EmailConfirmationRequested',
      version: 1,
      id: eventId,
      occurredAt: '2026-11-11T18:00:00.000Z',
      data: {
        accountId,
        fullName: 'Ana Ribeiro',
        email: 'ana@example.com',
        token: 'a'.repeat(32),
        expiresAt: '2026-11-12T18:00:00.000Z',
      },
    }
    const message = buildMessage(event, 'http://localhost:5173')
    expect(message.subject).toBe('Confirme seu e-mail no Veridt')
    expect(message.to).toBe('ana@example.com')
    expect(message.text).toContain('http://localhost:5173/confirm?token=' + 'a'.repeat(32))
  })

  it('builds a one-time password reset link', () => {
    const event: EmailEvent = {
      type: 'PasswordResetRequested',
      version: 1,
      id: eventId,
      occurredAt: '2026-11-11T18:00:00.000Z',
      data: {
        accountId,
        fullName: 'Ana Ribeiro',
        email: 'ana@example.com',
        token: 'b'.repeat(32),
        expiresAt: '2026-11-11T18:30:00.000Z',
      },
    }
    const message = buildMessage(event, 'http://localhost:5173')
    expect(message.subject).toBe('Redefina sua senha no Veridt')
    expect(message.text).toContain('http://localhost:5173/reset-password?token=' + 'b'.repeat(32))
  })
})
