import { Genders, Pet, Prisma } from '@prisma/client'

import { prisma } from '@/shared/libs'

import { PetsRepository, SearchAllParams } from '../interfaces/pets.repository'

export class PrismaPetsRespository implements PetsRepository {
  public async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    const pet = await prisma.pet.create({ data })

    return pet
  }

  public async getById(petId: string): Promise<Pet | null> {
    const pet = await prisma.pet.findUnique({ where: { id: petId } })

    return pet
  }

  public async searchAll(
    query: SearchAllParams,
    page: number = 1,
  ): Promise<Pet[] | null> {
    const pets = await prisma.pet.findMany({
      where: {
        organization: { city: { contains: query.city, mode: 'insensitive' } },
        ...(query.gender && { gender: query.gender as Genders }),
        ...(query.ageClassification && {
          ageClassification: {
            equals: query.ageClassification,
            mode: 'insensitive',
          },
        }),
        ...(query.energyLevel && {
          energyLevel: {
            description: { equals: query.energyLevel, mode: 'insensitive' },
          },
        }),
        ...(query.size && {
          size: { description: { equals: query.size, mode: 'insensitive' } },
        }),
        ...(query.independenceLevel && {
          IndependenceLevel: {
            description: {
              equals: query.independenceLevel,
              mode: 'insensitive',
            },
          },
        }),
        ...(query.environment && {
          environment: { equals: query.environment, mode: 'insensitive' },
        }),
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return pets
  }
}
