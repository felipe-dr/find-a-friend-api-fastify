import { Prisma, Size } from '@prisma/client'

import { SizesRepository } from '../interfaces/sizes.repository'

export class InMemorySizesRepository implements SizesRepository {
  public sizes: Size[] = []

  public async create(data: Prisma.SizeCreateInput): Promise<Size> {
    const size = {
      level: data.level,
      description: data.description,
    }

    this.sizes.push(size)

    return size
  }

  public async getByDescription(description: string): Promise<Size | null> {
    const size = this.sizes.find(
      (size) => size.description.toLowerCase() === description.toLowerCase(),
    )

    if (!size) {
      return null
    }

    return size
  }
}
