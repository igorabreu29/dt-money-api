import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeCreateUseCase } from '../../use-case/factories/make-create-use-case'

export async function create(req: FastifyRequest, res: FastifyReply) {
  const createTransactionSchema = z.object({
    description: z.string(),
    type: z.enum(['income', 'outcome']),
    price: z.number(),
    category: z.string(),
  })

  const { description, type, price, category } = createTransactionSchema.parse(
    req.body,
  )
  const useCase = makeCreateUseCase()

  const result = await useCase.execute({
    description,
    type,
    price,
    category,
  })

  if (result.isLeft()) {
    return res.status(400).send({ message: result.value.message })
  }

  const { transaction } = result.value

  return res.status(201).send({
    transaction,
  })
}
