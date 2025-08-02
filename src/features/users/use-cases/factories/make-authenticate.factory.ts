import { PrismaUsersRepository } from '@/features/users/repositories'
import { AuthenticateUseCase } from '@/features/users/use-cases'

export function makeAuthenticateFactory() {
  const usersRepository = new PrismaUsersRepository()
  const authenticateUserUseCase = new AuthenticateUseCase(usersRepository)

  return authenticateUserUseCase
}
