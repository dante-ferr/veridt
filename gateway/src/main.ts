import { remoteJwks, verifyAccessToken } from '@veridt/auth'
import Fastify, { type FastifyReply, type FastifyRequest } from 'fastify'
import { classifyRoute, isRateLimited, tooManyAttempts, upstreamFor } from './routes'

const identityUrl = required('IDENTITY_URL')
const paymentsUrl = required('PAYMENTS_URL')
const jwksUrl = required('JWKS_URL')
const issuer = process.env.JWT_ISSUER ?? 'veridt-identity'
const audience = process.env.JWT_AUDIENCE ?? 'veridt'
const port = Number(process.env.PORT ?? '8080')
const keys = remoteJwks(jwksUrl)
const buckets = new Map<string, { count: number; resetAt: number }>()

async function main(): Promise<void> {
  const app = Fastify({ logger: false, bodyLimit: 65_536 })
  app.removeContentTypeParser('application/json')
  app.addContentTypeParser('application/json', { parseAs: 'buffer' }, (_request, body, done) => {
    const raw = body.toString('utf8')
    if (!raw) {
      done(null, {})
      return
    }
    try {
      done(null, JSON.parse(raw) as unknown)
    } catch (error) {
      done(error as Error, undefined)
    }
  })
  app.addHook('onResponse', (request, reply, done) => {
    console.log(
      JSON.stringify({
        msg: 'request',
        method: request.method,
        path: request.url.split('?')[0],
        status: reply.statusCode,
      }),
    )
    done()
  })
  app.setErrorHandler((_error, _request, reply) => {
    reply.status(400).send({ error: 'invalid_input', message: 'Check the form fields.' })
  })
  app.all('/*', async (request, reply) => {
    await handle(request, reply)
  })
  await app.listen({ port, host: '0.0.0.0' })
  console.log(JSON.stringify({ msg: 'service_ready', service: 'gateway', port }))
}

async function handle(request: FastifyRequest, reply: FastifyReply): Promise<void> {
  const pathOnly = request.url.split('?')[0] ?? request.url
  const routeClass = classifyRoute(request.method, pathOnly)
  if (routeClass === 'missing') {
    reply.status(404).send({ error: 'not_found', message: 'Route not found.' })
    return
  }
  if (isRateLimited(request.method, pathOnly) && tooManyAttempts(buckets, clientIp(request), Date.now())) {
    reply.status(429).send({ error: 'too_many_requests', message: 'Too many attempts. Wait a minute and try again.' })
    return
  }
  if (routeClass === 'protected') {
    const header = request.headers.authorization
    const token = typeof header === 'string' && header.startsWith('Bearer ') ? header.slice(7) : ''
    if (!token) {
      reply.status(401).send({ error: 'unauthenticated', message: 'Sign in to continue.' })
      return
    }
    try {
      await verifyAccessToken(token, keys, { issuer, audience })
    } catch {
      reply.status(401).send({ error: 'unauthenticated', message: 'Sign in to continue.' })
    }
  }
  if (reply.sent) return
  if (pathOnly === '/v1/health') {
    reply.send({ status: 'ok' })
    return
  }
  await proxy(request, reply, upstreamFor(pathOnly))
}

async function proxy(request: FastifyRequest, reply: FastifyReply, upstreamName: 'identity' | 'payments'): Promise<void> {
  const base = upstreamName === 'payments' ? paymentsUrl : identityUrl
  const headers = new Headers()
  const contentType = request.headers['content-type']
  if (typeof contentType === 'string') headers.set('content-type', contentType)
  if (typeof request.headers.authorization === 'string') headers.set('authorization', request.headers.authorization)
  if (typeof request.headers.cookie === 'string') headers.set('cookie', request.headers.cookie)
  const hasBody = request.method !== 'GET' && request.method !== 'HEAD'
  try {
    const upstream = await fetch(new URL(request.url, base), {
      method: request.method,
      headers,
      body: hasBody ? JSON.stringify(request.body ?? {}) : undefined,
    })
    reply.status(upstream.status)
    const type = upstream.headers.get('content-type')
    if (type) reply.header('content-type', type)
    const cookies = upstream.headers.getSetCookie()
    if (cookies.length > 0) reply.header('set-cookie', cookies)
    if (upstream.status === 204) {
      reply.send()
      return
    }
    reply.send(await upstream.text())
  } catch (error) {
    console.log(JSON.stringify({
      msg: 'upstream_unavailable',
      upstream: upstreamName,
      error: error instanceof Error ? error.message : 'unknown',
    }))
    reply.status(502).send({ error: 'unavailable', message: 'The upstream service is unavailable.' })
  }
}

function clientIp(request: FastifyRequest): string {
  const forwarded = request.headers['x-forwarded-for']
  if (typeof forwarded === 'string' && forwarded.length > 0) {
    return forwarded.split(',')[0]?.trim() || request.ip
  }
  return request.ip
}

function required(name: string): string {
  const value = process.env[name]
  if (!value) {
    console.error(JSON.stringify({ msg: 'missing_config', key: name }))
    process.exit(1)
  }
  return value
}

main()
