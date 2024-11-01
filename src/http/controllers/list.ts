import type { FastifyReply, FastifyRequest } from 'fastify'
import { makeListTransactionsUseCase } from '../../use-case/factories/make-list-transactions-use-case'

export async function list(req: FastifyRequest, res: FastifyReply) {
  const useCase = makeListTransactionsUseCase()

  try {
    const result = await useCase.execute()

    return res.status(200).send({
      transactions: result.value?.transactions,
    })
  } catch (err) {
    return err
  }
}
