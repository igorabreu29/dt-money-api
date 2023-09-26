import { FastifyReply, FastifyRequest } from "fastify";
import { DeleteTransaction } from "./delete-transaction";

import { z } from 'zod'

export class DeleteTransactionController {
    constructor(
        private readonly deleteTransaction: DeleteTransaction
    ) {}

    async handler(req: FastifyRequest, res: FastifyReply) {
        try {
            const deleteTransactionSchema = z.object({
                id: z.string()
            })

            const { id } = deleteTransactionSchema.parse(req.params)

            await this.deleteTransaction.execute(id)

            return res.status(200).send()
        } catch(err) {
            console.log(err)
        }
    }
}