import {
  ArgumentsHost,
  Body,
  Catch,
  Controller,
  ExceptionFilter,
  Get,
  Headers,
  HttpCode,
  HttpException,
  Param,
  Post,
} from '@nestjs/common'
import { remoteJwks, verifyAccessToken, type Access } from '@veridt/auth'
import { z, ZodError } from 'zod'
import type { Result } from '../application/result'
import { GetCreditOrder, ListCreditOrders, ListCreditPackages, RecordCreditOrder } from '../application/use-cases'
import type { Billing } from '../domain/catalog'
import { Config } from '../infrastructure/config'

const billingBody = z.object({
  fullName: z.string(),
  email: z.string(),
  phone: z.string(),
  cpf: z.string(),
  postalCode: z.string(),
  street: z.string(),
  number: z.string(),
  complement: z.string().optional().default(''),
  district: z.string(),
  city: z.string(),
  state: z.string(),
})

const orderBody = z.object({
  packageId: z.string().uuid(),
  billing: billingBody,
})

function send<T>(result: Result<T>): T {
  if (!result.ok) throw new HttpException({ error: result.error, message: result.message }, result.status)
  return result.value
}

@Catch()
export class HttpErrorFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    const response = host.switchToHttp().getResponse<{ status: (code: number) => { json: (body: unknown) => void } }>()
    if (exception instanceof ZodError) {
      response.status(400).json({ error: 'invalid_input', message: 'Check the form fields.' })
      return
    }
    if (exception instanceof HttpException) {
      const body = exception.getResponse()
      response.status(exception.getStatus()).json(typeof body === 'string' ? { error: 'request_failed', message: body } : body)
      return
    }
    console.log(JSON.stringify({ msg: 'internal_error', type: exception instanceof Error ? exception.name : 'error' }))
    response.status(500).json({ error: 'internal_error', message: 'The operation could not be completed.' })
  }
}

@Controller('health')
export class HealthController {
  @Get()
  health() {
    return { status: 'ok' }
  }
}

@Controller('credit-packages')
export class PackagesController {
  private jwks: ReturnType<typeof remoteJwks> | null = null

  constructor(
    private readonly listPackages: ListCreditPackages,
    private readonly config: Config,
  ) {}

  @Get()
  async list(@Headers('authorization') authorization: string | undefined) {
    await accessFrom(authorization, this.keys(), this.config)
    return { items: await this.listPackages.execute() }
  }

  private keys(): ReturnType<typeof remoteJwks> {
    this.jwks ??= remoteJwks(this.config.jwksUrl)
    return this.jwks
  }
}

@Controller('credit-orders')
export class OrdersController {
  private jwks: ReturnType<typeof remoteJwks> | null = null

  constructor(
    private readonly recordOrder: RecordCreditOrder,
    private readonly listOrders: ListCreditOrders,
    private readonly getOrder: GetCreditOrder,
    private readonly config: Config,
  ) {}

  @Get()
  async list(@Headers('authorization') authorization: string | undefined) {
    const access = await accessFrom(authorization, this.keys(), this.config)
    return { items: await this.listOrders.execute(access.sub) }
  }

  @Post()
  @HttpCode(201)
  async create(@Headers('authorization') authorization: string | undefined, @Body() body: unknown) {
    const access = await accessFrom(authorization, this.keys(), this.config)
    const input = orderBody.parse(body)
    return this.recordOrder.execute({
      accountId: access.sub,
      packageId: input.packageId,
      billing: normalizeBilling(input.billing),
    }, new Date()).then(send)
  }

  @Get(':id')
  async show(@Headers('authorization') authorization: string | undefined, @Param('id') id: string) {
    const access = await accessFrom(authorization, this.keys(), this.config)
    return this.getOrder.execute(access.sub, id).then(send)
  }

  private keys(): ReturnType<typeof remoteJwks> {
    this.jwks ??= remoteJwks(this.config.jwksUrl)
    return this.jwks
  }
}

function normalizeBilling(input: z.infer<typeof billingBody>): Billing {
  return {
    fullName: input.fullName.trim(),
    email: input.email.trim().toLowerCase(),
    phone: input.phone.replace(/\D/g, ''),
    cpf: input.cpf.replace(/\D/g, ''),
    postalCode: input.postalCode.replace(/\D/g, ''),
    street: input.street.trim(),
    number: input.number.trim(),
    complement: input.complement.trim(),
    district: input.district.trim(),
    city: input.city.trim(),
    state: input.state.trim().toUpperCase(),
  }
}

async function accessFrom(
  header: string | undefined,
  keys: ReturnType<typeof remoteJwks>,
  config: Config,
): Promise<Access> {
  const token = bearer(header)
  if (!token) throw new HttpException({ error: 'unauthenticated', message: 'Sign in to continue.' }, 401)
  try {
    return await verifyAccessToken(token, keys, { issuer: config.issuer, audience: config.audience })
  } catch {
    throw new HttpException({ error: 'unauthenticated', message: 'Sign in to continue.' }, 401)
  }
}

function bearer(header: string | undefined): string | null {
  if (!header) return null
  const [scheme, token] = header.split(' ')
  if (scheme !== 'Bearer' || !token) return null
  return token
}
