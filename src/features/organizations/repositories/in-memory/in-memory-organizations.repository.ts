import { Organization, Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'

import { OrganizationsRepository } from '../interfaces/organizations.repository'

export class InMemoryOrganizationsRepository
  implements OrganizationsRepository
{
  public organizations: Organization[] = []

  public async create(
    data: Prisma.OrganizationUncheckedCreateInput,
  ): Promise<Organization> {
    const organization = {
      id: data.id ?? randomUUID(),
      name: data.name,
      postalCode: data.postalCode,
      street: data.street,
      neighborhood: data.neighborhood,
      state: data.state,
      city: data.city,
      latitude: new Prisma.Decimal(data.latitude.toString()),
      longitude: new Prisma.Decimal(data.longitude.toString()),
      whatsApp: data.whatsApp,
      userId: data.userId,
      createdAt: new Date(),
    }

    this.organizations.push(organization)

    return organization
  }

  public async getByName(name: string): Promise<Organization | null> {
    const organization = this.organizations.find(
      (organization) => organization.name === name,
    )

    if (!organization) {
      return null
    }

    return organization
  }
}
