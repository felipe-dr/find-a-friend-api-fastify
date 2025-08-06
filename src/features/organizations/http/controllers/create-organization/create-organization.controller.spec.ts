import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/app'
import { createAndAuthenticateUserUtil } from '@/shared/utilities'

import { makeOrganizationFactory } from 'tests/factories'

describe('Create Organization Controller (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create an organization', async () => {
    const { token } = await createAndAuthenticateUserUtil(app)

    const response = await request(app.server)
      .post('/organizations')
      .set('Authorization', `Bearer ${token}`)
      .send(makeOrganizationFactory({ postalCode: '02180000' }))

    expect(response.statusCode).toEqual(201)
  })
})
