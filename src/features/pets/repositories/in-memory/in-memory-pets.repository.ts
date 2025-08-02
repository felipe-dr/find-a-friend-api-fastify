import { Pet, Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'

import { InMemoryEnergyLevelsRepository } from '@/features/energy-levels/repositories'
import { InMemoryIndependenceLevelsRepository } from '@/features/independence-levels/repositories'
import { InMemoryOrganizationsRepository } from '@/features/organizations/repositories'
import { InMemorySizesRepository } from '@/features/sizes/repositories'

import { PetsRepository, SearchAllParams } from '../interfaces/pets.repository'

export class InMemoryPetsRepository implements PetsRepository {
  constructor(
    private organizationsRepository: InMemoryOrganizationsRepository,
    private energyLevelsRepository: InMemoryEnergyLevelsRepository,
    private independenceLevelsRepository: InMemoryIndependenceLevelsRepository,
    private sizesRepository: InMemorySizesRepository,
  ) {}

  public pets: Pet[] = []

  public async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    const pet = {
      id: randomUUID(),
      gender: data.gender,
      name: data.name,
      about: data.about,
      age: data.age,
      ageClassification: data.ageClassification,
      sizeLevelId: data.sizeLevelId,
      energyLevelId: data.energyLevelId,
      independenceLevelId: data.independenceLevelId,
      environment: data.environment,
      photos: Array.isArray(data.photos) ? data.photos : [],
      donationRequirements: Array.isArray(data.donationRequirements)
        ? data.donationRequirements
        : [],
      organizationId: data.organizationId,
      createdAt: new Date(),
    }

    this.pets.push(pet)

    return pet
  }

  public async getById(petId: string): Promise<Pet | null> {
    const pet = this.pets.find((pet) => pet.id === petId)

    if (!pet) {
      return null
    }

    return pet
  }

  public async searchAll(
    query: SearchAllParams,
    page: number = 1,
  ): Promise<Pet[] | null> {
    const organizationsByCity =
      this.organizationsRepository.organizations.filter(
        (organization) =>
          organization.city.toLowerCase() === query.city.toLowerCase(),
      )
    const energyLevelId = query.energyLevel
      ? await this.energyLevelsRepository.getByDescription(query.energyLevel)
      : null
    const independenceLevelId = query.independenceLevel
      ? await this.independenceLevelsRepository.getByDescription(
          query.independenceLevel,
        )
      : null
    const sizeId = query.size
      ? await this.sizesRepository.getByDescription(query.size)
      : null

    const pets = this.pets
      .filter((pet) =>
        organizationsByCity.some(
          (organization) => organization.id === pet.organizationId,
        ),
      )
      .filter((pet) =>
        query.gender
          ? pet.gender.toLowerCase() === query.gender.toLowerCase()
          : true,
      )
      .filter((pet) =>
        query.ageClassification
          ? pet.ageClassification.toLowerCase() ===
            query.ageClassification.toLowerCase()
          : true,
      )
      .filter((pet) =>
        query.energyLevel ? pet.energyLevelId === energyLevelId?.level : true,
      )
      .filter((pet) =>
        query.independenceLevel
          ? pet.independenceLevelId === independenceLevelId?.level
          : true,
      )
      .filter((pet) => (query.size ? pet.sizeLevelId === sizeId?.level : true))
      .filter((pet) =>
        query.environment
          ? pet.environment.toLowerCase() === query.environment.toLowerCase()
          : true,
      )
      .slice((page - 1) * 20, page * 20)

    return pets
  }
}
