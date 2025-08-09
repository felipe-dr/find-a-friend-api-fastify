import { Genders, Pet } from '@prisma/client'

import { PetsRepository } from '@/features/pets/repositories'

import { handleAgeClassificationUtil } from '@/shared/utilities'

interface CreatePetUseCaseRequest {
  gender: Genders
  name: string
  about: string
  age: number
  sizeLevelId: number
  energyLevelId: number
  independenceLevelId: number
  environment: string
  photos: string[]
  donationRequirements: string[]
  organizationId: string
}

interface CreatePetUseCaseResponse {
  pet: Pet
}

export class CreatePetUseCase {
  constructor(private petsRepository: PetsRepository) {}

  public async execute({
    gender,
    name,
    about,
    age,
    sizeLevelId,
    energyLevelId,
    independenceLevelId,
    environment,
    photos,
    donationRequirements,
    organizationId,
  }: CreatePetUseCaseRequest): Promise<CreatePetUseCaseResponse> {
    const pet = await this.petsRepository.create({
      gender,
      name,
      about,
      age,
      ageClassification: handleAgeClassificationUtil(age),
      sizeLevelId,
      energyLevelId,
      independenceLevelId,
      environment,
      photos,
      donationRequirements,
      organizationId,
    })

    return { pet }
  }
}
