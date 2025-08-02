import { IndependenceLevel, Prisma } from '@prisma/client'

export interface IndependenceLevelsRepository {
  create(
    independenceLevel: Prisma.IndependenceLevelCreateInput,
  ): Promise<IndependenceLevel>
  getByDescription(description: string): Promise<IndependenceLevel | null>
}
