import { FastifyReply, FastifyRequest } from "fastify";
import { ListTransactions } from "./list-transactions";
import { z } from "zod";
import { Transaction } from "../../entities/Transaction";

export class ListTransactionsController {
    constructor(
        private readonly listTransactions: ListTransactions
    ) {}

    async handler(req: FastifyRequest, res: FastifyReply): Promise<Transaction[]> {
        try {
            const transactionSearchParamsSchema = z.object({
                q: z.string().optional()
            })
            const { q } = transactionSearchParamsSchema.parse(req.query)

            const transactions = await this.listTransactions.execute()

            const filterTransactionByDescriptionCaseExistQuery = q ? transactions.filter(transaction => transaction.description.includes(q)) : transactions

            return res.status(200).send(filterTransactionByDescriptionCaseExistQuery)
        } catch(err) {
            console.log(err)
        }
    }
}