import { EnergyLevel, Prisma } from '@prisma/client'

export interface EnergyLevelsRepository {
  create(energyLevel: Prisma.EnergyLevelCreateInput): Promise<EnergyLevel>
  getByDescription(description: string): Promise<EnergyLevel | null>
}
