import { FastifyInstance } from "fastify";
import { createTransactionController } from "../use-case/create-user";
import { listTransactionsController } from "../use-case/list-transactions";
import { deleteTransactionController } from "../use-case/delete-transaction";
import { searchTransactionController } from "../use-case/search-transaction";

export async function transactionRouter(app: FastifyInstance) {
    app.get('/transactions', async (req, res) => {
        const transactions = await listTransactionsController.handler(req, res)

        return transactions
    })

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