import { FastifyInstance } from "fastify";
import { createTransactionController } from "../../use-case/create-user";
import { deleteTransactionController } from "../../use-case/delete-transaction";
import { searchTransactionController } from "../../use-case/search-transaction";
import { list } from "./list";

export async function transactionRouter(app: FastifyInstance) {
    app.get('/transactions', list)

    app.get('/transactions/search', async (req, res) => {
        const searchTransaction = await searchTransactionController.handler(req, res)

        return searchTransaction
    })

    app.post('/transactions', async (req, res) => {
        const transactionCreated = await createTransactionController.handler(req, res)

        return transactionCreated
    })

    app.delete('/transactions/:id', async (req, res) => {
        return await deleteTransactionController.handler(req, res)
    })
}