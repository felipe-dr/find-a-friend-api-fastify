import { PrismaUsersRepository } from '@/features/users/repositories'
import { CreateUserUseCase } from '@/features/users/use-cases'

export function makeCreateUserFactory() {
  const usersRepository = new PrismaUsersRepository()
  const createUserUseCase = new CreateUserUseCase(usersRepository)

  return createUserUseCase
}
