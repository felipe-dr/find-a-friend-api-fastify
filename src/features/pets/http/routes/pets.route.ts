import { FastifyInstance } from 'fastify'

import { verifyJwtMiddleware } from '@/shared/http'

import {
  CreatePetController,
  GetPetByIdController,
  SearchAllPetsController,
} from '../controllers'

export async function petsRoute(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwtMiddleware)

  app.post('/pets', CreatePetController)
  app.get('/pets/:id', GetPetByIdController)
  app.get('/pets', SearchAllPetsController)
}
