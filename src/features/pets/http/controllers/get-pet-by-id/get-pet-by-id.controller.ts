import { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

import { makeGetPetByIdFactory } from '@/features/pets/use-cases/factories'

export async function GetPetByIdController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getPetParamsSchema = z.object({
    id: z.string(),
  })

  const { id } = getPetParamsSchema.parse(request.params)

  try {
    const getPetByIdUseCase = makeGetPetByIdFactory()

    const { pet } = await getPetByIdUseCase.execute({
      petId: id,
    })

    return reply.status(200).send({ pet })
  } catch (error: unknown) {}
}
