import { Prisma, User } from '@prisma/client'

import { prisma } from '@/shared/libs'

import { UsersRepository } from '../interfaces/users.repository'

export class PrismaUsersRepository implements UsersRepository {
  public async create(data: Prisma.UserCreateInput): Promise<User> {
    const user = await prisma.user.create({ data })

    return user
  }

  public async getByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({ where: { email } })

    return user
  }
}
