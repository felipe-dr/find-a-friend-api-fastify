import { beforeEach, describe, expect, it } from 'vitest'

import { InMemorySizesRepository } from '@/features/sizes/repositories'

import { ResourceNotFoundError } from '@/shared/use-cases/errors'

import { GetSizeByDescriptionUseCase } from './get-size-by-description.usecase'

let sizesRepository: InMemorySizesRepository
let sut: GetSizeByDescriptionUseCase

describe('Get Size By Description Use Case', () => {
  beforeEach(async () => {
    sizesRepository = new InMemorySizesRepository()
    sut = new GetSizeByDescriptionUseCase(sizesRepository)
  })

  it('should be able to get a size by description', async () => {
    const sizeDescription = 'Low'
    const createdSize = await sizesRepository.create({
      level: 1,
      description: sizeDescription,
    })

    const { size } = await sut.execute({
      description: createdSize.description,
    })

    expect(size.description).toEqual(sizeDescription)
  })

  it('should not be able to get a size with wrong description', async () => {
    await expect(async () => {
      await sut.execute({
        description: 'wrong-description',
      })
    }).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
