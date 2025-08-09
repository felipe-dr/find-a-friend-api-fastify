import { vi } from 'vitest'
import { LocationsRepository } from '@/features/locations/repositories'

export function brasilApiRepositoryMock(): LocationsRepository {
  return {
    getAddressAndGeolocationByPostalCode: vi.fn().mockResolvedValue({
      postalCode: '06410000',
      street: 'Street of the Mock',
      city: 'City of the Mock',
      neighborhood: 'Gardens of the Mocks',
      state: 'SP',
      latitude: -46.8660847,
      longitude: -23.4993625,
    }),
  }
}
