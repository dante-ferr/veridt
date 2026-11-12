import { randomUUID } from 'node:crypto'
import { Injectable } from '@nestjs/common'
import { BILLING_RECORDED, billingError, freezePackage, type Billing, type PackageOffer } from '../domain/catalog'
import { CreditStore, type StoredOrder } from './credit-store'
import { fail, ok, type Result } from './result'

const billingMessages: Record<string, string> = {
  invalid_name: 'Enter the billing name.',
  invalid_email: 'Enter a valid billing email.',
  invalid_phone: 'Enter a valid phone number.',
  invalid_cpf: 'Enter a valid CPF.',
  invalid_postal_code: 'Enter the postal code with 8 digits.',
  invalid_address: 'Enter the street, number, district, and city.',
  invalid_region: 'Enter the state as two letters.',
}

export type OrderView = {
  id: string
  packageName: string
  creditCount: number
  pricePerCreditCents: number
  totalCents: number
  state: string
  billing: Billing
  createdAt: string
}

@Injectable()
export class ListCreditPackages {
  constructor(private readonly store: CreditStore) {}

  async execute(): Promise<Array<PackageOffer & { totalCents: number }>> {
    const packages = await this.store.listActivePackages()
    return packages.map((offer) => ({ ...offer, totalCents: freezePackage(offer).totalCents }))
  }
}

@Injectable()
export class RecordCreditOrder {
  constructor(private readonly store: CreditStore) {}

  async execute(input: { accountId: string; packageId: string; billing: Billing }, now: Date): Promise<Result<OrderView>> {
    const problem = billingError(input.billing)
    if (problem) return fail(problem, billingMessages[problem] ?? 'Check the billing fields.', 400)
    const offer = await this.store.findActivePackage(input.packageId)
    if (!offer) return fail('unknown_package', 'Choose an available credit package.', 404)
    const frozen = freezePackage(offer)
    const order: StoredOrder = {
      id: randomUUID(),
      accountId: input.accountId,
      packageId: offer.id,
      packageName: frozen.packageName,
      creditCount: frozen.creditCount,
      pricePerCreditCents: frozen.pricePerCreditCents,
      totalCents: frozen.totalCents,
      state: BILLING_RECORDED,
      billing: input.billing,
      createdAt: now,
    }
    await this.store.saveOrder(order)
    return ok(present(order))
  }
}

@Injectable()
export class ListCreditOrders {
  constructor(private readonly store: CreditStore) {}

  async execute(accountId: string): Promise<OrderView[]> {
    const orders = await this.store.listOrders(accountId)
    return orders.map(present)
  }
}

@Injectable()
export class GetCreditOrder {
  constructor(private readonly store: CreditStore) {}

  async execute(accountId: string, id: string): Promise<Result<OrderView>> {
    const order = await this.store.findOrder(accountId, id)
    if (!order) return fail('not_found', 'Order not found.', 404)
    return ok(present(order))
  }
}

function present(order: StoredOrder): OrderView {
  return {
    id: order.id,
    packageName: order.packageName,
    creditCount: order.creditCount,
    pricePerCreditCents: order.pricePerCreditCents,
    totalCents: order.totalCents,
    state: order.state,
    billing: order.billing,
    createdAt: order.createdAt.toISOString(),
  }
}
