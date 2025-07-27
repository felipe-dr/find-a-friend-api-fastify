import { Organization } from '@prisma/client'

import { LocationsRepository } from '@/features/locations/repositories'
import { OrganizationsRepository } from '@/features/organizations/repositories'
import { CreateUserUseCase } from '@/features/users/use-cases'

import { OrganizationAlreadyExistsError } from '../errors'

interface CreateOrganizationUseCaseRequest {
  name: string
  postalCode: string
  street: string
  city: string
  neighborhood: string
  state: string
  whatsApp: string
  email: string
  password: string
}

interface CreateOrganizationUseCaseResponse {
  organization: Organization
}

export class CreateOrganizationUseCase {
  constructor(
    private organizationsRepository: OrganizationsRepository,
    private createUserUseCase: CreateUserUseCase,
    private locationsRepository: LocationsRepository,
  ) {}

  public async execute({
    name,
    postalCode,
    street,
    neighborhood,
    state,
    city,
    whatsApp,
    email,
    password,
  }: CreateOrganizationUseCaseRequest): Promise<CreateOrganizationUseCaseResponse> {
    const { user } = await this.createUserUseCase.execute({ email, password })

    const organizationWithSameName =
      await this.organizationsRepository.getByName(name)

    if (organizationWithSameName) {
      throw new OrganizationAlreadyExistsError()
    }

    const addressAndGeolocation =
      await this.locationsRepository.getAddressAndGeolocationByPostalCode(
        postalCode,
      )

    const organization = await this.organizationsRepository.create({
      name,
      postalCode,
      street,
      neighborhood,
      state,
      city,
      latitude: addressAndGeolocation?.latitude ?? 0,
      longitude: addressAndGeolocation?.longitude ?? 0,
      whatsApp,
      userId: user.id,
    })

    return { organization }
  }
}
