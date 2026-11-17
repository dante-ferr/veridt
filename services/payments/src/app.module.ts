import { Module } from '@nestjs/common'
import { CreditStore } from './application/credit-store'
import {
  GetCreditBalance,
  GetCreditOrder,
  ListCreditOrders,
  ListCreditPackages,
  RecordCreditOrder,
} from './application/use-cases'
import { BalanceController, HealthController, OrdersController, PackagesController } from './api/http'
import { Config } from './infrastructure/config'
import { PrismaCreditStore } from './infrastructure/prisma-credit-store'
import { PrismaService } from './infrastructure/prisma.service'

@Module({
  controllers: [HealthController, PackagesController, BalanceController, OrdersController],
  providers: [
    { provide: Config, useFactory: () => Config.read() },
    PrismaService,
    PrismaCreditStore,
    { provide: CreditStore, useExisting: PrismaCreditStore },
    ListCreditPackages,
    RecordCreditOrder,
    ListCreditOrders,
    GetCreditOrder,
    GetCreditBalance,
  ],
})
export class AppModule {}
