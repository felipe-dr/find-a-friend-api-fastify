import { User } from '@prisma/client'
import { hash } from 'bcryptjs'

import { UsersRepository } from '@/features/users/repositories'

import { UserAlreadyExistsError } from '../errors'

interface CreateUserUseCaseRequest {
  email: string
  password: string
}

interface CreateUserUseCaseResponse {
  user: User
}

export class CreateUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  public async execute({
    email,
    password,
  }: CreateUserUseCaseRequest): Promise<CreateUserUseCaseResponse> {
    const userWithSameEmail = await this.usersRepository.getByEmail(email)

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError()
    }

    const passwordHash = await hash(password, 6)

    const user = await this.usersRepository.create({
      email,
      passwordHash,
    })

    return { user }
  }
}
