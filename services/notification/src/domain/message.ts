import type { EmailEvent } from '@veridt/events'

export type OutboundEmail = {
  to: string
  subject: string
  text: string
}

export function buildMessage(event: EmailEvent, origin: string): OutboundEmail {
  if (event.type === 'EmailConfirmationRequested') {
    const link = new URL('/confirm', origin)
    link.searchParams.set('token', event.data.token)
    return {
      to: event.data.email,
      subject: 'Confirme seu e-mail no Veridt',
      text: [
        `Olá, ${event.data.fullName}.`,
        '',
        'Confirme seu e-mail para entrar no Veridt. O link é de uso único e vale 24 horas.',
        '',
        link.toString(),
      ].join('\n'),
    }
  }
  const link = new URL('/reset-password', origin)
  link.searchParams.set('token', event.data.token)
  return {
    to: event.data.email,
    subject: 'Redefina sua senha no Veridt',
    text: [
      `Olá, ${event.data.fullName}.`,
      '',
      'Recebemos um pedido para redefinir sua senha. O link é de uso único e vale 30 minutos.',
      'Se você não pediu, ignore esta mensagem.',
      '',
      link.toString(),
    ].join('\n'),
  }
}
