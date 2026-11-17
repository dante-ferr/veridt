import { describe, expect, it } from 'vitest'
import { seedPackages, type Billing, type PackageOffer } from '../domain/catalog'
import { CreditStore, type StoredOrder } from './credit-store'
import { GetCreditBalance, RecordCreditOrder } from './use-cases'

const billing: Billing = {
  fullName: 'Ana Ribeiro',
  email: 'ana@example.com',
  phone: '11987654321',
  cpf: '39053344705',
  postalCode: '01310100',
  street: 'Avenida Paulista',
  number: '1000',
  complement: '',
  district: 'Bela Vista',
  city: 'São Paulo',
  state: 'SP',
}

class MemoryCreditStore extends CreditStore {
  orders: StoredOrder[] = []
  balances = new Map<string, number>()

  async listActivePackages(): Promise<PackageOffer[]> {
    return seedPackages.filter((offer) => offer.active)
  }

  async findActivePackage(id: string): Promise<PackageOffer | null> {
    return seedPackages.find((offer) => offer.id === id && offer.active) ?? null
  }

  async saveOrder(order: StoredOrder): Promise<void> {
    this.orders.push(order)
    this.balances.set(order.accountId, (this.balances.get(order.accountId) ?? 0) + order.creditCount)
  }

  async listOrders(accountId: string): Promise<StoredOrder[]> {
    return this.orders.filter((order) => order.accountId === accountId)
  }

  async findOrder(accountId: string, id: string): Promise<StoredOrder | null> {
    return this.orders.find((order) => order.accountId === accountId && order.id === id) ?? null
  }

  async getBalance(accountId: string): Promise<number> {
    return this.balances.get(accountId) ?? 0
  }
}

describe('credit purchase balance', () => {
  it('credits the package amount when billing is recorded', async () => {
    const store = new MemoryCreditStore()
    const record = new RecordCreditOrder(store)
    const balance = new GetCreditBalance(store)
    const accountId = 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa'
    const offer = seedPackages[0]

    expect(await balance.execute(accountId)).toEqual({ available: 0 })

    const created = await record.execute(
      { accountId, packageId: offer.id, billing },
      new Date('2026-11-16T12:00:00.000Z'),
    )
    expect(created.ok).toBe(true)
    expect(await balance.execute(accountId)).toEqual({ available: offer.creditCount })
  })
})
