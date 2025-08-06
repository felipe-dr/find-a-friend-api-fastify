import { BrasilApiRepository } from '@/features/locations/repositories'
import { PrismaOrganizationsRespository } from '@/features/organizations/repositories'
import { CreateOrganizationUseCase } from '@/features/organizations/use-cases'
import { PrismaUsersRepository } from '@/features/users/repositories'
import { CreateUserUseCase } from '@/features/users/use-cases'

export function makeCreateOrganizationFactory() {
  const organizationsRepository = new PrismaOrganizationsRespository()
  const usersRepository = new PrismaUsersRepository()
  const locationsRepository = new BrasilApiRepository()
  const createUserUseCase = new CreateUserUseCase(usersRepository)
  const createOrganizationUseCase = new CreateOrganizationUseCase(
    organizationsRepository,
    createUserUseCase,
    locationsRepository,
  )

  return createOrganizationUseCase
}
