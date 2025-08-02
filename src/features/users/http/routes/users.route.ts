import { FastifyInstance } from 'fastify'

import { AuthenticateController, createUserController } from '../controllers'

export async function usersRoute(app: FastifyInstance) {
  app.post('/users', createUserController)
  app.post('/sessions', AuthenticateController)
}
