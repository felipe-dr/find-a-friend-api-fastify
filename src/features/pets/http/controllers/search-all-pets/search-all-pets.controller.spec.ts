import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/app'
import { prisma } from '@/shared/libs'
import { createAndAuthenticateUserUtil } from '@/shared/utilities'

import { makeOrganizationFactory, makePetFactory } from 'tests/factories'

describe('Search All Pets Controller (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to search all pets by city', async () => {
    const { token } = await createAndAuthenticateUserUtil(app)

    await prisma.size.create({
      data: { level: 1, description: 'Small' },
    })

    await prisma.energyLevel.create({
      data: { level: 1, description: 'Low' },
    })

    await prisma.independenceLevel.create({
      data: { level: 1, description: 'Low' },
    })

    const organizationFirst = await request(app.server)
      .post('/organizations')
      .set('Authorization', `Bearer ${token}`)
      .send(
        makeOrganizationFactory({ city: 'São Paulo', postalCode: '02180000' }),
      )

    const organizationFirstId = organizationFirst.body.organization.id

    await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send(
        makePetFactory({
          sizeLevelId: 1,
          energyLevelId: 1,
          independenceLevelId: 1,
          organizationId: organizationFirstId,
        }),
      )

    const organizationSecond = await request(app.server)
      .post('/organizations')
      .set('Authorization', `Bearer ${token}`)
      .send(
        makeOrganizationFactory({ city: 'São Paulo', postalCode: '02180000' }),
      )

    const organizationSecondId = organizationSecond.body.organization.id

    await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send(
        makePetFactory({
          sizeLevelId: 1,
          energyLevelId: 1,
          independenceLevelId: 1,
          organizationId: organizationSecondId,
        }),
      )

    const organizationThird = await request(app.server)
      .post('/organizations')
      .set('Authorization', `Bearer ${token}`)
      .send(makeOrganizationFactory({ city: 'Paraná', postalCode: '02180000' }))

    const thirdOrganizationId = organizationThird.body.organization.id

    await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send(
        makePetFactory({
          sizeLevelId: 1,
          energyLevelId: 1,
          independenceLevelId: 1,
          organizationId: thirdOrganizationId,
        }),
      )

    const response = await request(app.server)
      .get(`/pets`)
      .query({ city: 'são paulo' })
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.pets).toHaveLength(2)
  })

  it('should be able to search all pets with all the filters', async () => {
    const { token } = await createAndAuthenticateUserUtil(app)

    await prisma.size.create({
      data: { level: 2, description: 'Medium' },
    })

    await prisma.energyLevel.create({
      data: { level: 2, description: 'Medium' },
    })

    await prisma.independenceLevel.create({
      data: { level: 2, description: 'Medium' },
    })

    const organization = await request(app.server)
      .post('/organizations')
      .set('Authorization', `Bearer ${token}`)
      .send(makeOrganizationFactory({ city: 'Bahia', postalCode: '02180000' }))

    const organizationId = organization.body.organization.id

    await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send(
        makePetFactory({
          gender: 'CAT',
          age: 1,
          sizeLevelId: 2,
          energyLevelId: 2,
          independenceLevelId: 2,
          environment: 'indoor',
          organizationId,
        }),
      )

    await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send(
        makePetFactory({
          gender: 'CAT',
          age: 1,
          sizeLevelId: 2,
          energyLevelId: 2,
          independenceLevelId: 2,
          environment: 'indoor',
          organizationId,
        }),
      )

    await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send(
        makePetFactory({
          gender: 'CAT',
          age: 1,
          sizeLevelId: 2,
          energyLevelId: 2,
          independenceLevelId: 1,
          environment: 'Indoor',
          organizationId,
        }),
      )

    const response = await request(app.server)
      .get(`/pets`)
      .query({
        city: 'bahia',
        gender: 'CAT',
        ageClassification: 'young',
        sizeLevel: 'medium',
        energyLevel: 'medium',
        independenceLevel: 'medium',
        environment: 'indoor',
      })
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.pets).toHaveLength(2)
  })
})
