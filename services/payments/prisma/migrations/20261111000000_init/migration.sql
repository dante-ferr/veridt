-- CreateTable
CREATE TABLE "credit_packages" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "credit_count" INTEGER NOT NULL,
    "price_per_credit_cents" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "credit_packages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "credit_orders" (
    "id" TEXT NOT NULL,
    "account_id" TEXT NOT NULL,
    "package_id" TEXT NOT NULL,
    "package_name" TEXT NOT NULL,
    "credit_count" INTEGER NOT NULL,
    "price_per_credit_cents" INTEGER NOT NULL,
    "total_cents" INTEGER NOT NULL,
    "state" TEXT NOT NULL,
    "billing" JSONB NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "credit_orders_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "credit_packages_code_key" ON "credit_packages"("code");

-- CreateIndex
CREATE INDEX "credit_orders_account_id_created_at_idx" ON "credit_orders"("account_id", "created_at");
