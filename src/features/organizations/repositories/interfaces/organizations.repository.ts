import { Organization, Prisma } from '@prisma/client'

export interface OrganizationsRepository {
  create(
    organization: Prisma.OrganizationUncheckedCreateInput,
  ): Promise<Organization>
  getByName(name: string): Promise<Organization | null>
}
