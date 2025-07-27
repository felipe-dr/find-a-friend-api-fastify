import { AddressAndGeolocationModel } from '@/features/locations/models'
import { LocationsRepository } from '@/features/locations/repositories'

import { BrasilApiError } from '../errors'

interface GetAddressAndGeolocationByPostalCodeUseCaseRequest {
  postalCode: string
}

export interface GetAddressAndGeolocationByPostalCodeUseCaseResponse {
  addressAndGeolocation: AddressAndGeolocationModel
}

export class GetAddressAndGeolocationByPostalCodeUseCase {
  constructor(private locationsRepository: LocationsRepository) {}

  public async execute({
    postalCode,
  }: GetAddressAndGeolocationByPostalCodeUseCaseRequest) {
    const addressAndGeolocation =
      await this.locationsRepository.getAddressAndGeolocationByPostalCode(
        postalCode,
      )

    if (!addressAndGeolocation) {
      throw new BrasilApiError()
    }

    return { addressAndGeolocation }
  }
}
