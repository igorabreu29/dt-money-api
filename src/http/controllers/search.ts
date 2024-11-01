import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeSearchUseCase } from '../../use-case/factories/make-search-use-case'

export async function search(req: FastifyRequest, res: FastifyReply) {
  const searchParamsSchema = z.object({
    q: z.string(),
  })

  const { q } = searchParamsSchema.parse(req.query)

  const useCase = makeSearchUseCase()
  const result = await useCase.execute({ query: q })

  return res.status(200).send({
    transactions: result.value?.transactions,
  })
}
