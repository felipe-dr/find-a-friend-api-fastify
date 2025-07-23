import { Prisma, User } from '@prisma/client'
import { randomUUID } from 'node:crypto'

import { UsersRepository } from '../interfaces/users.repository'

export class InMemoryUsersRepository implements UsersRepository {
  public users: User[] = []

  public async create(user: Prisma.UserCreateInput): Promise<User> {
    const userData = {
      id: randomUUID(),
      email: user.email,
      passwordHash: user.passwordHash,
      createdAt: new Date(),
    }

    this.users.push(userData)

    return userData
  }

  public async getByEmail(email: string): Promise<User | null> {
    const user = this.users.find((user) => user.email === email)

    if (!user) {
      return null
    }

    return user
  }
}
