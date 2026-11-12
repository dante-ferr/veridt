import type { Billing, PackageOffer } from '../domain/catalog'

export type StoredOrder = {
  id: string
  accountId: string
  packageId: string
  packageName: string
  creditCount: number
  pricePerCreditCents: number
  totalCents: number
  state: string
  billing: Billing
  createdAt: Date
}

export abstract class CreditStore {
  abstract listActivePackages(): Promise<PackageOffer[]>
  abstract findActivePackage(id: string): Promise<PackageOffer | null>
  abstract saveOrder(order: StoredOrder): Promise<void>
  abstract listOrders(accountId: string): Promise<StoredOrder[]>
  abstract findOrder(accountId: string, id: string): Promise<StoredOrder | null>
}
