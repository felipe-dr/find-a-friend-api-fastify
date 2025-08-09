import { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

import { makeSearchAllPetsFactory } from '@/features/pets/use-cases/factories'

export async function SearchAllPetsController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const searchAllPetsQuerySchema = z.object({
    city: z.string(),
    gender: z.string().optional(),
    ageClassification: z.string().optional(),
    energyLevel: z.string().optional(),
    size: z.string().optional(),
    independenceLevel: z.string().optional(),
    environment: z.string().optional(),
    page: z.number().optional(),
  })

  const {
    city,
    gender,
    ageClassification,
    energyLevel,
    size,
    independenceLevel,
    environment,
    page,
  } = searchAllPetsQuerySchema.parse(request.query)

  try {
    const searchAllPetsUseCase = makeSearchAllPetsFactory()

    const { pets } = await searchAllPetsUseCase.execute({
      city,
      gender,
      ageClassification,
      energyLevel,
      environment,
      independenceLevel,
      size,
      page,
    })

    return reply.status(200).send({ pets })
  } catch (error: unknown) {}
}
