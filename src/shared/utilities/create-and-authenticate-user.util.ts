import { hash } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import request from 'supertest'

import { prisma } from '../libs'

export async function createAndAuthenticateUserUtil(app: FastifyInstance) {
  await prisma.user.create({
    data: {
      email: 'johndoe@example.com',
      passwordHash: await hash('123456', 6),
    },
  })

  const authResponse = await request(app.server).post('/sessions').send({
    email: 'johndoe@example.com',
    password: '123456',
  })

  const { token } = authResponse.body

  return {
    token,
  }
}
