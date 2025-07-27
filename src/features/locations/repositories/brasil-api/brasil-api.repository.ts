import axios, { AxiosError } from 'axios'

import { AddressAndGeolocationModel } from '@/features/locations/models'
import { LocationsRepository } from '@/features/locations/repositories'

interface BrasilApiResponse {
  cep: string
  state: string
  city: string
  neighborhood: string
  street: string
  service: string
  location: {
    type: string
    coordinates: {
      longitude: number
      latitude: number
    }
  }
}

const BRASIL_API_URL = 'https://brasilapi.com.br/api/cep/v2'

export class BrasilApiRepository implements LocationsRepository {
  public async getAddressAndGeolocationByPostalCode(
    postalCode: string,
  ): Promise<AddressAndGeolocationModel | null> {
    try {
      const response = await axios.get<BrasilApiResponse>(
        `${BRASIL_API_URL}/${postalCode}`,
      )
      const addressAndGeolocation = response.data
      const { latitude, longitude } = addressAndGeolocation.location.coordinates

      return {
        postalCode: addressAndGeolocation.cep,
        street: addressAndGeolocation.street,
        city: addressAndGeolocation.city,
        neighborhood: addressAndGeolocation.neighborhood,
        state: addressAndGeolocation.state,
        latitude,
        longitude,
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError
        const is404AxiosError = axiosError.response?.status === 404

        if (is404AxiosError) {
          return null
        }

        console.error('[ BrasilAPI ]: error - ', axiosError.message)
      } else {
        console.error('[ BrasilAPI ]: unexpected error - ', error)
      }

      return null
    }
  }
}
