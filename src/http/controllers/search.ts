import { FastifyReply, FastifyRequest } from "fastify";
import { z } from 'zod'
import { makeSearchUseCase } from "../../use-case/factories/make-search-use-case";

export async function search(req: FastifyRequest, res: FastifyReply) {
    const searchParamsSchema = z.object({
        q: z.string()
    })

    const { q } = searchParamsSchema.parse(req.query)

    const useCase = makeSearchUseCase()
    const {transactions} = await useCase.execute(q)

    return res.status(200).send({
        transactions
    })
}