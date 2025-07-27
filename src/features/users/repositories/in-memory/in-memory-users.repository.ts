import { Prisma, User } from '@prisma/client'
import { randomUUID } from 'node:crypto'

import { UsersRepository } from '../interfaces/users.repository'

export class InMemoryUsersRepository implements UsersRepository {
  public users: User[] = []

  public async create(data: Prisma.UserCreateInput): Promise<User> {
    const user = {
      id: randomUUID(),
      email: data.email,
      passwordHash: data.passwordHash,
      createdAt: new Date(),
    }

    this.users.push(user)

    return user
  }

  public async getByEmail(email: string): Promise<User | null> {
    const user = this.users.find((user) => user.email === email)

    if (!user) {
      return null
    }

    return user
  }
}
