export const BILLING_RECORDED = 'billing_recorded'

export type PackageOffer = {
  id: string
  code: string
  name: string
  creditCount: number
  pricePerCreditCents: number
  description: string
  active: boolean
}

export const seedPackages: PackageOffer[] = [
  {
    id: '11111111-1111-4111-8111-111111111111',
    code: 'basic',
    name: 'Básico',
    creditCount: 10,
    pricePerCreditCents: 500,
    description: 'Para registros avulsos.',
    active: true,
  },
  {
    id: '22222222-2222-4222-8222-222222222222',
    code: 'standard',
    name: 'Médio',
    creditCount: 30,
    pricePerCreditCents: 400,
    description: 'Para uso recorrente.',
    active: true,
  },
  {
    id: '33333333-3333-4333-8333-333333333333',
    code: 'premium',
    name: 'Premium',
    creditCount: 100,
    pricePerCreditCents: 300,
    description: 'Para um volume maior, com o menor valor por crédito.',
    active: true,
  },
]

export type Billing = {
  fullName: string
  email: string
  phone: string
  cpf: string
  postalCode: string
  street: string
  number: string
  complement: string
  district: string
  city: string
  state: string
}

export type FrozenPackage = {
  packageName: string
  creditCount: number
  pricePerCreditCents: number
  totalCents: number
}

export function freezePackage(offer: PackageOffer): FrozenPackage {
  return {
    packageName: offer.name,
    creditCount: offer.creditCount,
    pricePerCreditCents: offer.pricePerCreditCents,
    totalCents: offer.creditCount * offer.pricePerCreditCents,
  }
}

export function billingError(billing: Billing): string | null {
  if (billing.fullName.trim().length < 3) return 'invalid_name'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(billing.email)) return 'invalid_email'
  if (billing.phone.trim().length < 8) return 'invalid_phone'
  if (!isValidCpf(billing.cpf)) return 'invalid_cpf'
  if (!/^\d{8}$/.test(billing.postalCode)) return 'invalid_postal_code'
  if (billing.street.trim().length < 1 || billing.number.trim().length < 1) return 'invalid_address'
  if (billing.district.trim().length < 1 || billing.city.trim().length < 1) return 'invalid_address'
  if (!/^[A-Z]{2}$/.test(billing.state)) return 'invalid_region'
  return null
}

function isValidCpf(value: string): boolean {
  if (!/^\d{11}$/.test(value)) return false
  if (/^(\d)\1{10}$/.test(value)) return false
  const digits = [...value].map((digit) => Number(digit))
  const first = checkDigit(digits.slice(0, 9))
  const second = checkDigit(digits.slice(0, 10))
  return first === digits[9] && second === digits[10]
}

function checkDigit(base: number[]): number {
  let weight = base.length + 1
  let sum = 0
  for (const digit of base) {
    sum += digit * weight
    weight -= 1
  }
  const remainder = sum % 11
  if (remainder < 2) return 0
  return 11 - remainder
}
