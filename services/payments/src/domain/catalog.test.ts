import { describe, expect, it } from 'vitest'
import { BILLING_RECORDED, billingError, freezePackage, seedPackages, type Billing } from './catalog'

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

describe('credit catalog', () => {
  it('prices the three packages from the brief', () => {
    const totals = Object.fromEntries(seedPackages.map((offer) => [offer.code, freezePackage(offer).totalCents]))
    expect(totals).toEqual({ basic: 5000, standard: 12000, premium: 30000 })
    expect(BILLING_RECORDED).toBe('billing_recorded')
  })

  it('accepts a complete billing address', () => {
    expect(billingError(billing)).toBeNull()
  })

  it('rejects a billing address field by field', () => {
    expect(billingError({ ...billing, fullName: 'A' })).toBe('invalid_name')
    expect(billingError({ ...billing, email: 'not-an-email' })).toBe('invalid_email')
    expect(billingError({ ...billing, phone: '123' })).toBe('invalid_phone')
    expect(billingError({ ...billing, cpf: '11111111111' })).toBe('invalid_cpf')
    expect(billingError({ ...billing, postalCode: '123' })).toBe('invalid_postal_code')
    expect(billingError({ ...billing, street: '' })).toBe('invalid_address')
    expect(billingError({ ...billing, state: 'São' })).toBe('invalid_region')
  })
})
