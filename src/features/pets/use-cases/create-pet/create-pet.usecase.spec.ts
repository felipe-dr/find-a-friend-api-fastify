import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryEnergyLevelsRepository } from '@/features/energy-levels/repositories'
import { InMemoryIndependenceLevelsRepository } from '@/features/independence-levels/repositories'
import { InMemoryOrganizationsRepository } from '@/features/organizations/repositories'
import { InMemoryPetsRepository } from '@/features/pets/repositories'
import { InMemorySizesRepository } from '@/features/sizes/repositories'

import { makePetFactory } from 'tests/factories'

import { CreatePetUseCase } from './create-pet.usecase'

let organizationsRepository: InMemoryOrganizationsRepository
let energyLevelsRepository: InMemoryEnergyLevelsRepository
let independenceLevelsRepository: InMemoryIndependenceLevelsRepository
let sizesRepository: InMemorySizesRepository
let petsRepository: InMemoryPetsRepository
let sut: CreatePetUseCase

describe('Create Pet Use Case', () => {
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
    sut = new CreatePetUseCase(petsRepository)
  })

  it('should be able to create a baby pet', async () => {
    const { pet } = await sut.execute(makePetFactory({ age: 0.5 }))

    expect(pet.id).toEqual(expect.any(String))
    expect(pet.ageClassification).toEqual('Baby')
  })

  it('should be able to create a young pet', async () => {
    const { pet } = await sut.execute(makePetFactory({ age: 1 }))

    expect(pet.id).toEqual(expect.any(String))
    expect(pet.ageClassification).toEqual('Young')
  })

  it('should be able to create a adult pet', async () => {
    const { pet } = await sut.execute(makePetFactory({ age: 5 }))

    expect(pet.id).toEqual(expect.any(String))
    expect(pet.ageClassification).toEqual('Adult')
  })

  it('should be able to create a old pet', async () => {
    const { pet } = await sut.execute(makePetFactory({ age: 12 }))

    expect(pet.id).toEqual(expect.any(String))
    expect(pet.ageClassification).toEqual('Old')
  })

  it('should be able to create a baby pet when to receive invalid age', async () => {
    const { pet } = await sut.execute(makePetFactory({ age: -5 }))

    expect(pet.id).toEqual(expect.any(String))
    expect(pet.ageClassification).toEqual('Baby')
  })
})
