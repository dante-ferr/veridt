import { z } from 'zod'

const envelope = {
  version: z.literal(1),
  id: z.string().uuid(),
  occurredAt: z.string().datetime(),
}

const emailPayload = z.object({
  accountId: z.string().uuid(),
  fullName: z.string().min(1),
  email: z.string().email(),
  token: z.string().min(20),
  expiresAt: z.string().datetime(),
})

export const emailConfirmationRequested = z.object({
  type: z.literal('EmailConfirmationRequested'),
  ...envelope,
  data: emailPayload,
})

export const passwordResetRequested = z.object({
  type: z.literal('PasswordResetRequested'),
  ...envelope,
  data: emailPayload,
})

export const emailEvent = z.discriminatedUnion('type', [
  emailConfirmationRequested,
  passwordResetRequested,
])

export type EmailEvent = z.infer<typeof emailEvent>
