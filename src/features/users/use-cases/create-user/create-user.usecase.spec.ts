import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryUsersRepository } from '@/features/users/repositories'

import { UserAlreadyExistsError } from '../errors'
import { CreateUserUseCase } from './create-user.usecase'

let usersRepository: InMemoryUsersRepository
let sut: CreateUserUseCase

describe('Create User Use Case', () => {
  beforeEach(async () => {
    usersRepository = new InMemoryUsersRepository()
    sut = new CreateUserUseCase(usersRepository)
  })

  it('should be able to create an user', async () => {
    const { user } = await sut.execute({
      email: 'john.doe@test.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to create an user with same e-mail', async () => {
    const email = 'john.doe@test.com'

    await sut.execute({
      email,
      password: '123456',
    })

    await expect(async () => {
      await sut.execute({
        email,
        password: '123456',
      })
    }).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
