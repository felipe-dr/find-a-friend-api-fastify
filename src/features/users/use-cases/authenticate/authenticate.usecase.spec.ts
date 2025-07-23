import { hash } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryUsersRepository } from '@/features/users/repositories'

import { AuthenticateUseCase } from './authenticate.usecase'
import { InvalidCredentialsError } from '../errors'

let usersRepository: InMemoryUsersRepository
let sut: AuthenticateUseCase

describe('Authenticate Use Case ', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new AuthenticateUseCase(usersRepository)
  })

  it('should be able to authenticate', async () => {
    await usersRepository.create({
      email: 'john.doe@test.com',
      passwordHash: await hash('123456', 6),
    })

    const { user } = await sut.execute({
      email: 'john.doe@test.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with invalid email', async () => {
    await expect(async () => {
      await sut.execute({
        email: 'john.doe@test.com',
        password: '123456',
      })
    }).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with invalid password', async () => {
    await usersRepository.create({
      email: 'john.doe@test.com',
      passwordHash: await hash('123456', 6),
    })

    await expect(async () => {
      await sut.execute({
        email: 'john.doe@test.com',
        password: '123123',
      })
    }).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
