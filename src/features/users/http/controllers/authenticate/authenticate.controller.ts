import { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

import {
  InvalidCredentialsError,
  makeAuthenticateFactory,
} from '@/features/users/use-cases'

export async function AuthenticateController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authenticateBodySchema = z.object({
    email: z.string(),
    password: z.string(),
  })

  const { email, password } = authenticateBodySchema.parse(request.body)

  try {
    const authenticateUserUseCase = makeAuthenticateFactory()

    const { user } = await authenticateUserUseCase.execute({
      email,
      password,
    })

    const token = await reply.jwtSign({
      sign: {
        sub: user.id,
      },
    })

    const refreshToken = await reply.jwtSign({
      sign: {
        sub: user.id,
        expiresIn: '7d',
      },
    })

    reply
      .setCookie('refreshToken', refreshToken, {
        path: '/',
        secure: true,
        sameSite: true,
        httpOnly: true,
      })
      .status(200)
      .send({ token })
  } catch (error: unknown) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: error.message })
    }

    throw error
  }
}
