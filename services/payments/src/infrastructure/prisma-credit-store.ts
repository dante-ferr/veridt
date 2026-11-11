import { Injectable, type OnModuleInit } from '@nestjs/common'
import type { Prisma } from '../../generated/client'
import { CreditStore, type StoredOrder } from '../application/credit-store'
import { seedPackages, type Billing, type PackageOffer } from '../domain/catalog'
import { PrismaService } from './prisma.service'

@Injectable()
export class PrismaCreditStore extends CreditStore implements OnModuleInit {
  constructor(private readonly prisma: PrismaService) {
    super()
  }

  async onModuleInit(): Promise<void> {
    for (const offer of seedPackages) {
      await this.prisma.creditPackage.upsert({
        where: { code: offer.code },
        update: {
          name: offer.name,
          creditCount: offer.creditCount,
          pricePerCreditCents: offer.pricePerCreditCents,
          description: offer.description,
          active: offer.active,
        },
        create: offer,
      })
    }
  }

  async listActivePackages(): Promise<PackageOffer[]> {
    const rows = await this.prisma.creditPackage.findMany({ where: { active: true }, orderBy: { creditCount: 'asc' } })
    return rows.map(toOffer)
  }

  async findActivePackage(id: string): Promise<PackageOffer | null> {
    const row = await this.prisma.creditPackage.findFirst({ where: { id, active: true } })
    return row ? toOffer(row) : null
  }

  async saveOrder(order: StoredOrder): Promise<void> {
    await this.prisma.creditOrder.create({
      data: {
        id: order.id,
        accountId: order.accountId,
        packageId: order.packageId,
        packageName: order.packageName,
        creditCount: order.creditCount,
        pricePerCreditCents: order.pricePerCreditCents,
        totalCents: order.totalCents,
        state: order.state,
        billing: order.billing as unknown as Prisma.InputJsonValue,
        createdAt: order.createdAt,
      },
    })
  }

  async listOrders(accountId: string): Promise<StoredOrder[]> {
    const rows = await this.prisma.creditOrder.findMany({
      where: { accountId },
      orderBy: { createdAt: 'desc' },
      take: 20,
    })
    return rows.map(toOrder)
  }

  async findOrder(accountId: string, id: string): Promise<StoredOrder | null> {
    const row = await this.prisma.creditOrder.findFirst({ where: { id, accountId } })
    return row ? toOrder(row) : null
  }
}

function toOffer(row: {
  id: string
  code: string
  name: string
  creditCount: number
  pricePerCreditCents: number
  description: string
  active: boolean
}): PackageOffer {
  return {
    id: row.id,
    code: row.code,
    name: row.name,
    creditCount: row.creditCount,
    pricePerCreditCents: row.pricePerCreditCents,
    description: row.description,
    active: row.active,
  }
}

function toOrder(row: {
  id: string
  accountId: string
  packageId: string
  packageName: string
  creditCount: number
  pricePerCreditCents: number
  totalCents: number
  state: string
  billing: Prisma.JsonValue
  createdAt: Date
}): StoredOrder {
  return {
    id: row.id,
    accountId: row.accountId,
    packageId: row.packageId,
    packageName: row.packageName,
    creditCount: row.creditCount,
    pricePerCreditCents: row.pricePerCreditCents,
    totalCents: row.totalCents,
    state: row.state,
    billing: row.billing as Billing,
    createdAt: row.createdAt,
  }
}
