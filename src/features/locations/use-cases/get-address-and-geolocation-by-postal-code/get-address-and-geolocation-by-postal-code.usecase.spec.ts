import { beforeEach, describe, expect, it } from 'vitest'

import { BrasilApiRepository } from '@/features/locations/repositories'

import { GetAddressAndGeolocationByPostalCodeUseCase } from './get-address-and-geolocation-by-postal-code.usecase'

import { BrasilApiError } from '../errors'

let locationsRepository: BrasilApiRepository
let sut: GetAddressAndGeolocationByPostalCodeUseCase

describe('Get Address and Geolocation by Postal Code Use Case', () => {
  beforeEach(async () => {
    locationsRepository = new BrasilApiRepository()
    sut = new GetAddressAndGeolocationByPostalCodeUseCase(locationsRepository)
  })

  it('should be able to get addrress and geolocation by postal code', async () => {
    const postalCode = '06410000'

    const { addressAndGeolocation } = await sut.execute({ postalCode })

    expect(addressAndGeolocation?.postalCode).toEqual(postalCode)
    expect(addressAndGeolocation?.latitude).toEqual(expect.any(String))
    expect(addressAndGeolocation?.longitude).toEqual(expect.any(String))
  })

  it('should not be able to get addrress and geolocation with invalid postal code', async () => {
    const postalCode = '12345678'

    await expect(async () => {
      await sut.execute({ postalCode })
    }).rejects.toBeInstanceOf(BrasilApiError)
  })
})
