import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryIndependenceLevelsRepository } from '@/features/independence-levels/repositories'

import { ResourceNotFoundError } from '@/shared/use-cases/errors'

import { GetIndependenceLevelByDescriptionUseCase } from './get-independence-level-by-description.usecase'

let independenceLevelsRepository: InMemoryIndependenceLevelsRepository
let sut: GetIndependenceLevelByDescriptionUseCase

describe('Get Independence Level By Description Use Case', () => {
  beforeEach(async () => {
    independenceLevelsRepository = new InMemoryIndependenceLevelsRepository()
    sut = new GetIndependenceLevelByDescriptionUseCase(
      independenceLevelsRepository,
    )
  })

  it('should be able to get an independence level by description', async () => {
    const independenceLevelDescription = 'Low'
    const createdIndependenceLevel = await independenceLevelsRepository.create({
      level: 1,
      description: independenceLevelDescription,
    })

    const { independenceLevel } = await sut.execute({
      description: createdIndependenceLevel.description,
    })

    expect(independenceLevel.description).toEqual(independenceLevelDescription)
  })

  it('should not be able to get an independence level with wrong description', async () => {
    await expect(async () => {
      await sut.execute({
        description: 'wrong-description',
      })
    }).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
