import { FastifyInstance } from 'fastify'

import { verifyJwtMiddleware } from '@/shared/http'

import { CreateOrganizationController } from '../controllers'

export async function organizationsRoute(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwtMiddleware)

  app.post('/organizations', CreateOrganizationController)
}
