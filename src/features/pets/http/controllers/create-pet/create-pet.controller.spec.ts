import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/app'
import { prisma } from '@/shared/libs'
import { createAndAuthenticateUserUtil } from '@/shared/utilities'

import { makeOrganizationFactory, makePetFactory } from 'tests/factories'

describe('Create Pet Controller (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a pet', async () => {
    const { token } = await createAndAuthenticateUserUtil(app)

    const sizeLevel = await prisma.size.create({
      data: { level: 1, description: 'Small' },
    })

    const energyLevel = await prisma.energyLevel.create({
      data: { level: 1, description: 'Small' },
    })

    const independenceLevel = await prisma.independenceLevel.create({
      data: { level: 1, description: 'Small' },
    })

    const { body } = await request(app.server)
      .post('/organizations')
      .set('Authorization', `Bearer ${token}`)
      .send(makeOrganizationFactory({ postalCode: '02180000' }))

    const organizationId = body.organization.id

    const response = await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send(
        makePetFactory({
          sizeLevelId: sizeLevel.level,
          energyLevelId: energyLevel.level,
          independenceLevelId: independenceLevel.level,
          organizationId,
        }),
      )

    expect(response.statusCode).toEqual(201)
  })
})
