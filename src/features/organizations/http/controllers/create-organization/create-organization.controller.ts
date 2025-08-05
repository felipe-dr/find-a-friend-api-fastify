import { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

import {
  makeCreateOrganizationFactory,
  OrganizationAlreadyExistsError,
} from '@/features/organizations/use-cases'
import { UserAlreadyExistsError } from '@/features/users/use-cases'

export async function CreateOrganizationController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const createOrganizationBodySchema = z.object({
    name: z.string(),
    postalCode: z.string(),
    street: z.string(),
    neighborhood: z.string(),
    state: z.string(),
    city: z.string(),
    whatsApp: z.string(),
    email: z.email(),
    password: z.string().min(6),
  })

  const {
    name,
    postalCode,
    street,
    neighborhood,
    state,
    city,
    whatsApp,
    email,
    password,
  } = createOrganizationBodySchema.parse(request.body)

  try {
    const createOrganizationUseCase = makeCreateOrganizationFactory()

    const { organization } = await createOrganizationUseCase.execute({
      name,
      postalCode,
      street,
      neighborhood,
      state,
      city,
      whatsApp,
      email,
      password,
    })

    return reply.status(201).send({ organization })
  } catch (error: unknown) {
    if (error instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: error.message })
    }

    if (error instanceof OrganizationAlreadyExistsError) {
      return reply.status(409).send({ message: error.message })
    }

    throw error
  }
}
