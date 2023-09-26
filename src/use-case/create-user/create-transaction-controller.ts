import { FastifyReply, FastifyRequest } from "fastify";
import { CreateTransaction } from "./create-transaction";
import { z } from 'zod'

export class CreateTransactionController {
    constructor(
         private readonly createUser: CreateTransaction
    ) {}

    async handler(req: FastifyRequest, res: FastifyReply) {
        try {
            const createTransactionSchema = z.object({
                description: z.string(),
                type: z.enum(['income', 'outcome']),
                price: z.number(),
                category: z.string()
            })
    
            const { category, description, price, type } = createTransactionSchema.parse(req.body)
    
            const transactions = await this.createUser.execute({
                category,
                description,
                price,
                type
            })
    
            return transactions
        } catch(err) {
            return res.status(400).send(err.message)
        }
    }
}