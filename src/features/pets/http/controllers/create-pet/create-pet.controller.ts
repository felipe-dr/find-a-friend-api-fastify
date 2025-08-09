import { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

import { makeCreatePetFactory } from '@/features/pets/use-cases/factories'
import { Genders } from '@prisma/client'

export async function CreatePetController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const genders = Object.values(Genders) as [Genders, ...Genders[]]
  const createPetBodySchema = z.object({
    gender: z.enum(genders),
    name: z.string(),
    about: z.string(),
    age: z.number(),
    sizeLevelId: z.number(),
    energyLevelId: z.number(),
    independenceLevelId: z.number(),
    environment: z.string(),
    photos: z.array(z.string()),
    donationRequirements: z.array(z.string()),
    organizationId: z.string(),
  })

  const {
    gender,
    name,
    about,
    age,
    sizeLevelId,
    energyLevelId,
    independenceLevelId,
    environment,
    photos,
    donationRequirements,
    organizationId,
  } = createPetBodySchema.parse(request.body)

  const createPetUseCase = makeCreatePetFactory()

  const { pet } = await createPetUseCase.execute({
    gender,
    name,
    about,
    age,
    sizeLevelId,
    energyLevelId,
    independenceLevelId,
    environment,
    photos,
    donationRequirements,
    organizationId,
  })

  return reply.status(201).send({ pet })
}
