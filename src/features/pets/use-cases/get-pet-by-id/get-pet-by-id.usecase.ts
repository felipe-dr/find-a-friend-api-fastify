import { Pet } from '@prisma/client'

import { PetsRepository } from '@/features/pets/repositories'

import { ResourceNotFoundError } from '@/shared/use-cases/errors'

interface GetPetByIdUseCaseRequest {
  petId: string
}

interface GetPetByIdUseCaseResponse {
  pet: Pet
}

export class GetPetByIdUseCase {
  constructor(private petsRepository: PetsRepository) {}

  public async execute({
    petId,
  }: GetPetByIdUseCaseRequest): Promise<GetPetByIdUseCaseResponse> {
    const pet = await this.petsRepository.getById(petId)

    if (!pet) {
      throw new ResourceNotFoundError()
    }

    return { pet }
  }
}
