import { http } from "@/lib/http";

export type CreditPackage = {
  id: string;
  code: string;
  name: string;
  creditCount: number;
  pricePerCreditCents: number;
  totalCents: number;
  description: string;
  active: boolean;
};

export type Billing = {
  fullName: string;
  email: string;
  phone: string;
  cpf: string;
  postalCode: string;
  street: string;
  number: string;
  complement: string;
  district: string;
  city: string;
  state: string;
};

export type CreditOrderState = "billing_recorded";

export type CreditOrder = {
  id: string;
  packageName: string;
  creditCount: number;
  pricePerCreditCents: number;
  totalCents: number;
  state: CreditOrderState;
  billing: Billing;
  createdAt: string;
};

export type NewCreditOrder = {
  packageId: string;
  billing: Billing;
};

type ListResponse<T> = { items: T[] };

export async function listPackages(): Promise<CreditPackage[]> {
  const { data } =
    await http.get<ListResponse<CreditPackage>>("/credit-packages");
  return data.items;
}

export async function listOrders(): Promise<CreditOrder[]> {
  const { data } = await http.get<ListResponse<CreditOrder>>("/credit-orders");
  return data.items;
}

export async function createOrder(order: NewCreditOrder): Promise<CreditOrder> {
  const { data } = await http.post<CreditOrder>("/credit-orders", order);
  return data;
}
