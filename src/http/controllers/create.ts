import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeCreateUseCase } from "../../use-case/factories/make-create-use-case";
import { TransactionAlreadyExistError } from "../../use-case/errors/transaction-already-exist-error";

export async function create(req: FastifyRequest, res: FastifyReply) {
    const createTransactionSchema = z.object({
        description: z.string(),
        type: z.enum(['income', 'outcome']),
        price: z.number(),
        category: z.string()
    })

    const { description, type, price, category } = createTransactionSchema.parse(req.body)
    const useCase = makeCreateUseCase()
    
    try {  
        const { transaction } = await useCase.execute({
            description,
            type,
            price,
            category
        })

        res.status(201).send({
            transaction
        })
    } catch(err) {
        if (err instanceof TransactionAlreadyExistError) {
            return res.status(400).send(err.message)
        }

        return res.status(500).send()
    }
}