import { IndependenceLevel, Prisma } from '@prisma/client'

import { IndependenceLevelsRepository } from '../interfaces/independence-levels.repository'

export class InMemoryIndependenceLevelsRepository
  implements IndependenceLevelsRepository
{
  public independenceLevel: IndependenceLevel[] = []

  public async create(
    data: Prisma.IndependenceLevelCreateInput,
  ): Promise<IndependenceLevel> {
    const independenceLevel = {
      level: data.level,
      description: data.description,
    }

    this.independenceLevel.push(independenceLevel)

    return independenceLevel
  }

  public async getByDescription(
    description: string,
  ): Promise<IndependenceLevel | null> {
    const independenceLevel = this.independenceLevel.find(
      (independenceLevel) =>
        independenceLevel.description.toLowerCase() ===
        description.toLowerCase(),
    )

    if (!independenceLevel) {
      return null
    }

    return independenceLevel
  }
}
