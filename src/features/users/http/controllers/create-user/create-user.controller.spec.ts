import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/app'

describe('Create User Controller (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create an user', async () => {
    const response = await request(app.server).post('/users').send({
      email: 'john@doe.com',
      password: '1234567',
    })

    expect(response.statusCode).toEqual(201)
  })
})
