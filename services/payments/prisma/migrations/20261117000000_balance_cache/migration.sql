-- CreateTable
CREATE TABLE "balance_cache" (
    "account_id" TEXT NOT NULL,
    "available" INTEGER NOT NULL,

    CONSTRAINT "balance_cache_pkey" PRIMARY KEY ("account_id")
);
