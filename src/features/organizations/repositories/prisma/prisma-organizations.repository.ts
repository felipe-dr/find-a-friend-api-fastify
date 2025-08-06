import { Organization, Prisma } from '@prisma/client'

import { prisma } from '@/shared/libs'

import { OrganizationsRepository } from '../interfaces/organizations.repository'

export class PrismaOrganizationsRespository implements OrganizationsRepository {
  public async create(
    data: Prisma.OrganizationUncheckedCreateInput,
  ): Promise<Organization> {
    const organization = await prisma.organization.create({ data })

    return organization
  }

  public async getByName(name: string): Promise<Organization | null> {
    const organization = await prisma.organization.findUnique({
      where: { name },
    })

    return organization
  }
}
