import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryEnergyLevelsRepository } from '@/features/energy-levels/repositories'

import { ResourceNotFoundError } from '@/shared/use-cases/errors'

import { GetEnergyLevelByDescriptionUseCase } from './get-energy-level-by-description.usecase'

let energyLevelsRepository: InMemoryEnergyLevelsRepository
let sut: GetEnergyLevelByDescriptionUseCase

describe('Get Energy Level By Description Use Case', () => {
  beforeEach(async () => {
    energyLevelsRepository = new InMemoryEnergyLevelsRepository()
    sut = new GetEnergyLevelByDescriptionUseCase(energyLevelsRepository)
  })

  it('should be able to get an energy level by description', async () => {
    const energyLevelDescription = 'Low'
    const createdEnergyLevel = await energyLevelsRepository.create({
      level: 1,
      description: energyLevelDescription,
    })

    const { energyLevel } = await sut.execute({
      description: createdEnergyLevel.description,
    })

    expect(energyLevel.description).toEqual(energyLevelDescription)
  })

  it('should not be able to get an energy level with wrong description', async () => {
    await expect(async () => {
      await sut.execute({
        description: 'wrong-description',
      })
    }).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
