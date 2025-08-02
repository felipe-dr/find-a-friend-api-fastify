import { beforeEach, describe, expect, it } from 'vitest'

import { BrasilApiRepository } from '@/features/locations/repositories'
import { InMemoryOrganizationsRepository } from '@/features/organizations/repositories'
import { InMemoryUsersRepository } from '@/features/users/repositories'
import { CreateUserUseCase } from '@/features/users/use-cases'

import { makeOrganizationFactory } from 'tests/factories'

import { OrganizationAlreadyExistsError } from '../errors'
import { CreateOrganizationUseCase } from './create-organization.usecase'

let usersRepository: InMemoryUsersRepository
let organizationsRepository: InMemoryOrganizationsRepository
let locationsRepository: BrasilApiRepository
let createUserUseCase: CreateUserUseCase

let sut: CreateOrganizationUseCase

describe('Create Organization Use Case', () => {
  beforeEach(async () => {
    usersRepository = new InMemoryUsersRepository()
    organizationsRepository = new InMemoryOrganizationsRepository()
    locationsRepository = new BrasilApiRepository()
    createUserUseCase = new CreateUserUseCase(usersRepository)
    sut = new CreateOrganizationUseCase(
      organizationsRepository,
      createUserUseCase,
      locationsRepository,
    )
  })

  it('should be able to create an organization', async () => {
    const { organization } = await sut.execute(
      makeOrganizationFactory({ postalCode: '06410000' }),
    )

    expect(organization.id).toEqual(expect.any(String))
  })

  it('should not be able to create an organization with same name', async () => {
    const { organization } = await sut.execute(makeOrganizationFactory())

    await expect(async () => {
      await sut.execute(makeOrganizationFactory({ name: organization.name }))
    }).rejects.toBeInstanceOf(OrganizationAlreadyExistsError)
  })

  it('should be able to create an organization with latitude or longitude equal to 0', async () => {
    const { organization } = await sut.execute(makeOrganizationFactory())

    expect(organization.id).toEqual(expect.any(String))
    expect(Number(organization.latitude)).toEqual(0)
    expect(Number(organization.longitude)).toEqual(0)
  })
})
