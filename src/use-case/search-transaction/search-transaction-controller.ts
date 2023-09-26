import { FastifyReply, FastifyRequest } from "fastify";
import { SearchTransaction } from "./search-transaction";
import { z } from "zod";

export class SearchTransationController {
    constructor(
        private searchTransactionUseCase: SearchTransaction
    ) {}

    async handler(req: FastifyRequest, res: FastifyReply) {
        const transactionSearchParamsSchema = z.object({
            q: z.string()
        })
        
        const { q } = transactionSearchParamsSchema.parse(req.query)

        const searchTransaction = await this.searchTransactionUseCase.execute(q)

        return searchTransaction
    }
}