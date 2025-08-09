import { beforeEach, describe, expect, it, vi } from 'vitest'

import { InMemoryEnergyLevelsRepository } from '@/features/energy-levels/repositories'
import { InMemoryIndependenceLevelsRepository } from '@/features/independence-levels/repositories'
import { BrasilApiRepository } from '@/features/locations/repositories'
import { InMemoryOrganizationsRepository } from '@/features/organizations/repositories'
import { CreateOrganizationUseCase } from '@/features/organizations/use-cases'
import { InMemoryPetsRepository } from '@/features/pets/repositories'
import { InMemorySizesRepository } from '@/features/sizes/repositories'
import { InMemoryUsersRepository } from '@/features/users/repositories'
import { CreateUserUseCase } from '@/features/users/use-cases'

import { makeOrganizationFactory, makePetFactory } from 'tests/factories'
import { brasilApiRepositoryMock } from 'tests/mocks'

import { SearchAllPetsUseCase } from './search-all-pets.usecase'

let usersRepository: InMemoryUsersRepository
let organizationsRepository: InMemoryOrganizationsRepository
let locationsRepository: BrasilApiRepository
let energyLevelsRepository: InMemoryEnergyLevelsRepository
let independenceLevelsRepository: InMemoryIndependenceLevelsRepository
let petsRepository: InMemoryPetsRepository
let sizesRepository: InMemorySizesRepository
let createUserUseCase: CreateUserUseCase
let createOrganizationUseCase: CreateOrganizationUseCase
let sut: SearchAllPetsUseCase

describe('Search All Pets Use Case', () => {
  beforeEach(async () => {
    usersRepository = new InMemoryUsersRepository()
    organizationsRepository = new InMemoryOrganizationsRepository()
    locationsRepository = brasilApiRepositoryMock()
    createUserUseCase = new CreateUserUseCase(usersRepository)
    createOrganizationUseCase = new CreateOrganizationUseCase(
      organizationsRepository,
      createUserUseCase,
      locationsRepository,
    )
    energyLevelsRepository = new InMemoryEnergyLevelsRepository()
    independenceLevelsRepository = new InMemoryIndependenceLevelsRepository()
    sizesRepository = new InMemorySizesRepository()
    petsRepository = new InMemoryPetsRepository(
      organizationsRepository,
      energyLevelsRepository,
      independenceLevelsRepository,
      sizesRepository,
    )
    sut = new SearchAllPetsUseCase(petsRepository)
  })

  it('should be able to get all pets by city', async () => {
    const { organization: organizationFromCity1 } =
      await createOrganizationUseCase.execute(makeOrganizationFactory())
    const { organization: organizationFromCity2 } =
      await createOrganizationUseCase.execute(makeOrganizationFactory())

    await petsRepository.create(
      makePetFactory({ organizationId: organizationFromCity1.id }),
    )
    await petsRepository.create(
      makePetFactory({ organizationId: organizationFromCity1.id }),
    )
    await petsRepository.create(
      makePetFactory({ organizationId: organizationFromCity2.id }),
    )

    const { pets: petsFromCity1 } = await sut.execute({
      city: organizationFromCity1.city,
      page: 1,
    })
    expect(petsFromCity1).toHaveLength(2)

    const { pets: petsFromCity2 } = await sut.execute({
      city: organizationFromCity2.city,
      page: 1,
    })
    expect(petsFromCity2).toHaveLength(1)
  })

  it('should be able to get all pets by gender', async () => {
    const { organization: organizationFromCity1 } =
      await createOrganizationUseCase.execute(makeOrganizationFactory())
    const { organization: organizationFromCity2 } =
      await createOrganizationUseCase.execute(makeOrganizationFactory())

    await petsRepository.create(
      makePetFactory({
        gender: 'DOG',
        organizationId: organizationFromCity1.id,
      }),
    )
    await petsRepository.create(
      makePetFactory({
        gender: 'DOG',
        organizationId: organizationFromCity1.id,
      }),
    )
    await petsRepository.create(
      makePetFactory({
        gender: 'CAT',
        organizationId: organizationFromCity2.id,
      }),
    )

    const { pets: petsFromCity1 } = await sut.execute({
      city: organizationFromCity1.city,
      gender: 'DOG',
    })
    expect(petsFromCity1).toHaveLength(2)
  })

  it('should be able to get all pets by age', async () => {
    const { organization: organizationFromCity1 } =
      await createOrganizationUseCase.execute(makeOrganizationFactory())
    const { organization: organizationFromCity2 } =
      await createOrganizationUseCase.execute(makeOrganizationFactory())

    await petsRepository.create(
      makePetFactory({ age: 12, organizationId: organizationFromCity1.id }),
    )
    await petsRepository.create(
      makePetFactory({ age: 10, organizationId: organizationFromCity1.id }),
    )
    await petsRepository.create(
      makePetFactory({ age: 1, organizationId: organizationFromCity2.id }),
    )

    const { pets: petsFromCity1 } = await sut.execute({
      city: organizationFromCity1.city,
      ageClassification: 'Old',
    })
    expect(petsFromCity1).toHaveLength(2)
  })

  it('should be able to get all pets by energy level', async () => {
    const { organization: organizationFromCity1 } =
      await createOrganizationUseCase.execute(makeOrganizationFactory())
    const { organization: organizationFromCity2 } =
      await createOrganizationUseCase.execute(makeOrganizationFactory())

    await energyLevelsRepository.create({
      level: 1,
      description: 'Low',
    })
    await energyLevelsRepository.create({
      level: 2,
      description: 'Medium',
    })
    await petsRepository.create(
      makePetFactory({
        energyLevelId: 1,
        organizationId: organizationFromCity1.id,
      }),
    )
    await petsRepository.create(
      makePetFactory({
        energyLevelId: 1,
        organizationId: organizationFromCity1.id,
      }),
    )
    await petsRepository.create(
      makePetFactory({
        energyLevelId: 2,
        organizationId: organizationFromCity2.id,
      }),
    )

    const { pets: petsFromCity1 } = await sut.execute({
      city: organizationFromCity1.city,
      energyLevel: 'Low',
    })

    expect(petsFromCity1).toHaveLength(2)

    const { pets: petsFromCity2 } = await sut.execute({
      city: organizationFromCity2.city,
      energyLevel: 'Medium',
    })

    expect(petsFromCity2).toHaveLength(1)
  })

  it('should be able to get all pets by independence level', async () => {
    const { organization: organizationFromCity1 } =
      await createOrganizationUseCase.execute(makeOrganizationFactory())
    const { organization: organizationFromCity2 } =
      await createOrganizationUseCase.execute(makeOrganizationFactory())

    await independenceLevelsRepository.create({
      level: 1,
      description: 'Low',
    })
    await independenceLevelsRepository.create({
      level: 2,
      description: 'Medium',
    })
    await petsRepository.create(
      makePetFactory({
        independenceLevelId: 1,
        organizationId: organizationFromCity1.id,
      }),
    )
    await petsRepository.create(
      makePetFactory({
        independenceLevelId: 1,
        organizationId: organizationFromCity1.id,
      }),
    )
    await petsRepository.create(
      makePetFactory({
        independenceLevelId: 2,
        organizationId: organizationFromCity2.id,
      }),
    )

    const { pets: petsFromCity1 } = await sut.execute({
      city: organizationFromCity1.city,
      independenceLevel: 'Low',
    })

    expect(petsFromCity1).toHaveLength(2)
  })

  it('should be able to get all pets by size', async () => {
    const { organization: organizationFromCity1 } =
      await createOrganizationUseCase.execute(makeOrganizationFactory())
    const { organization: organizationFromCity2 } =
      await createOrganizationUseCase.execute(makeOrganizationFactory())

    await sizesRepository.create({
      level: 1,
      description: 'Small',
    })
    await sizesRepository.create({
      level: 2,
      description: 'Large',
    })
    await petsRepository.create(
      makePetFactory({
        sizeLevelId: 1,
        organizationId: organizationFromCity1.id,
      }),
    )
    await petsRepository.create(
      makePetFactory({
        sizeLevelId: 1,
        organizationId: organizationFromCity1.id,
      }),
    )
    await petsRepository.create(
      makePetFactory({
        sizeLevelId: 2,
        organizationId: organizationFromCity2.id,
      }),
    )

    const { pets: petsFromCity1 } = await sut.execute({
      city: organizationFromCity1.city,
      size: 'Small',
    })

    expect(petsFromCity1).toHaveLength(2)
  })

  it('should be able to get all pets by environment', async () => {
    const { organization: organizationFromCity1 } =
      await createOrganizationUseCase.execute(makeOrganizationFactory())
    const { organization: organizationFromCity2 } =
      await createOrganizationUseCase.execute(makeOrganizationFactory())

    await petsRepository.create(
      makePetFactory({
        environment: 'Indoor',
        organizationId: organizationFromCity1.id,
      }),
    )
    await petsRepository.create(
      makePetFactory({
        environment: 'Indoor',
        organizationId: organizationFromCity1.id,
      }),
    )
    await petsRepository.create(
      makePetFactory({
        environment: 'Outdoor',
        organizationId: organizationFromCity2.id,
      }),
    )

    const { pets: petsFromCity1 } = await sut.execute({
      city: organizationFromCity1.city,
      environment: 'Indoor',
    })

    expect(petsFromCity1).toHaveLength(2)
  })

  it('should be able to get all pets with all the filters', async () => {
    const { organization: organizationFromCity1 } =
      await createOrganizationUseCase.execute(makeOrganizationFactory())

    await energyLevelsRepository.create({
      level: 1,
      description: 'Low',
    })
    await energyLevelsRepository.create({
      level: 2,
      description: 'Medium',
    })
    await independenceLevelsRepository.create({
      level: 1,
      description: 'Low',
    })
    await independenceLevelsRepository.create({
      level: 2,
      description: 'Medium',
    })
    await sizesRepository.create({
      level: 1,
      description: 'Small',
    })
    await sizesRepository.create({
      level: 2,
      description: 'Large',
    })
    await petsRepository.create(
      makePetFactory({
        gender: 'CAT',
        ageClassification: 'Young',
        energyLevelId: 1,
        independenceLevelId: 1,
        sizeLevelId: 1,
        environment: 'Indoor',
        organizationId: organizationFromCity1.id,
      }),
    )
    await petsRepository.create(
      makePetFactory({
        gender: 'CAT',
        ageClassification: 'Young',
        energyLevelId: 1,
        independenceLevelId: 1,
        sizeLevelId: 1,
        environment: 'Indoor',
        organizationId: organizationFromCity1.id,
      }),
    )
    await petsRepository.create(
      makePetFactory({
        gender: 'CAT',
        ageClassification: 'Young',
        energyLevelId: 1,
        independenceLevelId: 1,
        sizeLevelId: 1,
        environment: 'Indoor',
        organizationId: organizationFromCity1.id,
      }),
    )
    await petsRepository.create(
      makePetFactory({
        gender: 'DOG',
        ageClassification: 'Young',
        energyLevelId: 1,
        independenceLevelId: 1,
        sizeLevelId: 1,
        environment: 'Indoor',
        organizationId: organizationFromCity1.id,
      }),
    )

    const { pets: petsFromCity1 } = await sut.execute({
      city: organizationFromCity1.city,
      gender: 'cat',
      ageClassification: 'young',
      energyLevel: 'LOW',
      independenceLevel: 'low',
      size: 'small',
      environment: 'indoor',
    })

    expect(petsFromCity1).toHaveLength(3)
  })

  it('should not be able to get all pets with wrong filter', async () => {
    vi.spyOn(petsRepository, 'searchAll').mockResolvedValue(null)

    const { pets } = await sut.execute({
      city: 'wrong-city',
    })

    expect(pets).toEqual([])
  })
})
