import { Prisma, Size } from '@prisma/client'

export interface SizesRepository {
  create(size: Prisma.SizeCreateInput): Promise<Size>
  getByDescription(description: string): Promise<Size | null>
}
