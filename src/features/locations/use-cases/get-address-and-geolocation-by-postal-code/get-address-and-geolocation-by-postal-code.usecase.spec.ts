import { beforeEach, describe, expect, it, vi } from 'vitest'

import { BrasilApiRepository } from '@/features/locations/repositories'

import { GetAddressAndGeolocationByPostalCodeUseCase } from './get-address-and-geolocation-by-postal-code.usecase'

import { brasilApiRepositoryMock } from 'tests/mocks'

import { BrasilApiError } from '../errors'

let locationsRepository: BrasilApiRepository
let sut: GetAddressAndGeolocationByPostalCodeUseCase

describe('Get Address and Geolocation by Postal Code Use Case', () => {
  beforeEach(async () => {
    locationsRepository = brasilApiRepositoryMock()
    sut = new GetAddressAndGeolocationByPostalCodeUseCase(locationsRepository)
  })

  it('should be able to get addrress and geolocation by postal code', async () => {
    const postalCode = '06410000'

    const { addressAndGeolocation } = await sut.execute({ postalCode })

    expect(addressAndGeolocation?.postalCode).toEqual(postalCode)
    expect(Number(addressAndGeolocation.latitude)).toBeLessThan(0)
    expect(Number(addressAndGeolocation.longitude)).toBeLessThan(0)
  })

  it('should not be able to get addrress and geolocation with invalid postal code', async () => {
    vi.spyOn(
      locationsRepository,
      'getAddressAndGeolocationByPostalCode',
    ).mockResolvedValue(null)
    const postalCode = '12345678'

    await expect(async () => {
      await sut.execute({ postalCode })
    }).rejects.toBeInstanceOf(BrasilApiError)
  })
})
