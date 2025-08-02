import { EnergyLevel, Prisma } from '@prisma/client'

import { EnergyLevelsRepository } from '../interfaces/energy-levels.repository'

export class InMemoryEnergyLevelsRepository implements EnergyLevelsRepository {
  public energyLevels: EnergyLevel[] = []

  public async create(
    data: Prisma.EnergyLevelCreateInput,
  ): Promise<EnergyLevel> {
    const energyLevel = {
      level: data.level,
      description: data.description,
    }

    this.energyLevels.push(energyLevel)

    return energyLevel
  }

  public async getByDescription(
    description: string,
  ): Promise<EnergyLevel | null> {
    const energyLevel = this.energyLevels.find(
      (energyLevel) =>
        energyLevel.description.toLowerCase() === description.toLowerCase(),
    )

    if (!energyLevel) {
      return null
    }

    return energyLevel
  }
}
