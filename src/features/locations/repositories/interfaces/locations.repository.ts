import { AddressAndGeolocationModel } from '@/features/locations/models'

export interface LocationsRepository {
  getAddressAndGeolocationByPostalCode(
    postalCode: string,
  ): Promise<AddressAndGeolocationModel | null>
}
