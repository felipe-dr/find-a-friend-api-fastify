import { Pet } from '@prisma/client'

import { PetsRepository } from '@/features/pets/repositories'

interface SearchAllPetsUseCaseRequest {
  city: string
  gender?: string
  ageClassification?: string
  energyLevel?: string
  size?: string
  independenceLevel?: string
  environment?: string
  page?: number
}

interface SearchAllPetsUseCaseResponse {
  pets: Pet[]
}

export class SearchAllPetsUseCase {
  constructor(private petsRepository: PetsRepository) {}

  public async execute({
    city,
    gender,
    ageClassification,
    energyLevel,
    size,
    independenceLevel,
    environment,
    page,
  }: SearchAllPetsUseCaseRequest): Promise<SearchAllPetsUseCaseResponse> {
    const pets = await this.petsRepository.searchAll(
      {
        gender,
        city,
        ageClassification,
        energyLevel,
        size,
        independenceLevel,
        environment,
      },
      page,
    )

    if (!pets) {
      return { pets: [] }
    }

    return { pets }
  }
}
