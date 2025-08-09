import { faker } from '@faker-js/faker'
import { Genders } from '@prisma/client'
import { randomUUID } from 'node:crypto'

import { handleAgeClassificationUtil } from '@/shared/utilities'

type MakePetFactoryOverwrite = {
  gender?: Genders
  name?: string
  about?: string
  age?: number
  ageClassification?: string
  sizeLevelId?: number
  energyLevelId?: number
  independenceLevelId?: number
  environment?: string
  photos?: string[]
  donationRequirements?: string[]
  organizationId?: string
}

export function makePetFactory(overwrite?: MakePetFactoryOverwrite) {
  return {
    gender:
      overwrite?.gender ??
      faker.helpers.arrayElement([Genders.DOG, Genders.CAT]),
    name: overwrite?.name ?? faker.animal.dog(),
    about: overwrite?.about ?? faker.lorem.paragraph(),
    age: overwrite?.age ?? faker.number.int({ min: 0, max: 20 }),
    ageClassification:
      overwrite?.ageClassification ??
      handleAgeClassificationUtil(overwrite?.age || 0),
    sizeLevelId:
      overwrite?.sizeLevelId ?? faker.helpers.arrayElement([1, 2, 3]),
    energyLevelId:
      overwrite?.energyLevelId ?? faker.helpers.arrayElement([1, 2, 3]),
    independenceLevelId:
      overwrite?.independenceLevelId ?? faker.helpers.arrayElement([1, 2, 3]),
    environment:
      overwrite?.environment ??
      faker.helpers.arrayElement(['Indoor', 'Outdoor']),
    photos: overwrite?.photos ?? [faker.internet.url.toString()],
    donationRequirements: overwrite?.donationRequirements ?? [
      faker.lorem.word.toString(),
    ],
    organizationId: overwrite?.organizationId ?? randomUUID(),
  }
}
