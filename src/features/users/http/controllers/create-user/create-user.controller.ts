import { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

import {
  UserAlreadyExistsError,
  makeCreateUserFactory,
} from '@/features/users/use-cases'

export async function createUserController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const createUserBodySchema = z.object({
    email: z.email(),
    password: z.string().min(6),
  })

  const { email, password } = createUserBodySchema.parse(request.body)

  try {
    const createUserUseCase = makeCreateUserFactory()

    const { user } = await createUserUseCase.execute({ email, password })

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordHash, ...userWithoutPassword } = user

    return reply.status(201).send({ user: userWithoutPassword })
  } catch (error: unknown) {
    if (error instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: error.message })
    }

    throw error
  }
}
