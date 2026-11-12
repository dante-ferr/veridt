export type CreditPackage = {
  id: string;
  code: "basic" | "standard" | "premium";
  name: string;
  creditCount: number;
  pricePerCreditCents: number;
  totalCents: number;
  description: string;
};

export type PaymentState =
  | "pending"
  | "approved"
  | "declined"
  | "expired"
  | "refunded";

export type PaymentMethod = "pix" | "checkout";

export type CreditOrder = {
  id: string;
  packageName: string;
  creditCount: number;
  method: PaymentMethod;
  state: PaymentState;
  createdAt: string;
};

const packages: CreditPackage[] = [
  {
    id: "11111111-1111-4111-8111-111111111111",
    code: "basic",
    name: "Básico",
    creditCount: 10,
    pricePerCreditCents: 500,
    totalCents: 5000,
    description: "Para registros avulsos.",
  },
  {
    id: "22222222-2222-4222-8222-222222222222",
    code: "standard",
    name: "Médio",
    creditCount: 30,
    pricePerCreditCents: 400,
    totalCents: 12000,
    description: "Para uso recorrente.",
  },
  {
    id: "33333333-3333-4333-8333-333333333333",
    code: "premium",
    name: "Premium",
    creditCount: 100,
    pricePerCreditCents: 300,
    totalCents: 30000,
    description: "Para um volume maior, com o menor valor por crédito.",
  },
];

const orders: CreditOrder[] = [
  {
    id: "a1b2c3d4-0001-4000-8000-000000000001",
    packageName: "Médio",
    creditCount: 30,
    method: "pix",
    state: "approved",
    createdAt: "2026-11-02T14:21:07Z",
  },
  {
    id: "a1b2c3d4-0002-4000-8000-000000000002",
    packageName: "Básico",
    creditCount: 10,
    method: "checkout",
    state: "declined",
    createdAt: "2026-11-05T09:03:44Z",
  },
  {
    id: "a1b2c3d4-0003-4000-8000-000000000003",
    packageName: "Premium",
    creditCount: 100,
    method: "pix",
    state: "pending",
    createdAt: "2026-11-10T18:47:12Z",
  },
];

export async function listPackages(): Promise<CreditPackage[]> {
  return packages;
}

export async function listOrders(): Promise<CreditOrder[]> {
  return orders;
}
