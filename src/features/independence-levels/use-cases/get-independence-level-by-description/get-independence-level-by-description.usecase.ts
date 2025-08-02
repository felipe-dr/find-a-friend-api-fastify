import { IndependenceLevel } from '@prisma/client'

import { IndependenceLevelsRepository } from '@/features/independence-levels/repositories'

import { ResourceNotFoundError } from '@/shared/use-cases/errors'

interface GetIndependenceLevelByDescriptionUseCaseRequest {
  description: string
}

interface GetIndependenceLevelByDescriptionUseCaseResponse {
  independenceLevel: IndependenceLevel
}

export class GetIndependenceLevelByDescriptionUseCase {
  constructor(
    private independenceLevelRepository: IndependenceLevelsRepository,
  ) {}

  public async execute({
    description,
  }: GetIndependenceLevelByDescriptionUseCaseRequest): Promise<GetIndependenceLevelByDescriptionUseCaseResponse> {
    const independenceLevel =
      await this.independenceLevelRepository.getByDescription(description)

    if (!independenceLevel) {
      throw new ResourceNotFoundError()
    }

    return { independenceLevel }
  }
}
