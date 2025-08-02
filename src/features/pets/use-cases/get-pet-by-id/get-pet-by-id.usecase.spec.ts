import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryEnergyLevelsRepository } from '@/features/energy-levels/repositories'
import { InMemoryIndependenceLevelsRepository } from '@/features/independence-levels/repositories'
import { InMemoryOrganizationsRepository } from '@/features/organizations/repositories'
import { InMemoryPetsRepository } from '@/features/pets/repositories'
import { InMemorySizesRepository } from '@/features/sizes/repositories'

import { ResourceNotFoundError } from '@/shared/use-cases/errors'

import { makePetFactory } from 'tests/factories'

import { GetPetByIdUseCase } from './get-pet-by-id.usecase'

let organizationsRepository = new InMemoryOrganizationsRepository()
let energyLevelsRepository: InMemoryEnergyLevelsRepository
let independenceLevelsRepository: InMemoryIndependenceLevelsRepository
let sizesRepository: InMemorySizesRepository
let petsRepository: InMemoryPetsRepository
let sut: GetPetByIdUseCase

describe('Get Pet By Id Use Case', () => {
  beforeEach(async () => {
    organizationsRepository = new InMemoryOrganizationsRepository()
    energyLevelsRepository = new InMemoryEnergyLevelsRepository()
    independenceLevelsRepository = new InMemoryIndependenceLevelsRepository()
    sizesRepository = new InMemorySizesRepository()
    petsRepository = new InMemoryPetsRepository(
      organizationsRepository,
      energyLevelsRepository,
      independenceLevelsRepository,
      sizesRepository,
    )
    sut = new GetPetByIdUseCase(petsRepository)
  })

  it('should be able to get a pet by id', async () => {
    const createdPet = await petsRepository.create(makePetFactory())

    const { pet } = await sut.execute({ petId: createdPet.id })

    expect(pet.name).toEqual(createdPet.name)
  })

  it('should not be able to get a pet with wrong id', async () => {
    await expect(async () => {
      await sut.execute({
        petId: 'wrong-id',
      })
    }).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
