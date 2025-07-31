import { EnergyLevel } from '@prisma/client'

import { EnergyLevelsRepository } from '@/features/energy-levels/repositories'
import { ResourceNotFoundError } from '@/shared/use-cases/errors'

interface GetEnergyLevelByDescriptionUseCaseRequest {
  description: string
}

interface GetEnergyLevelByDescriptionUseCaseResponse {
  energyLevel: EnergyLevel
}

export class GetEnergyLevelByDescriptionUseCase {
  constructor(private energyLevelsRepository: EnergyLevelsRepository) {}

  public async execute({
    description,
  }: GetEnergyLevelByDescriptionUseCaseRequest): Promise<GetEnergyLevelByDescriptionUseCaseResponse> {
    const energyLevel =
      await this.energyLevelsRepository.getByDescription(description)

    if (!energyLevel) {
      throw new ResourceNotFoundError()
    }

    return { energyLevel }
  }
}
