import { FastifyInstance } from "fastify";
import { list } from "./list";
import { create } from "./create";
import { search } from "./search";
import { remove } from "./remove";

export async function transactionRouter(app: FastifyInstance) {
    app.get('/transactions', list)
    app.get('/transactions/search', search)

    app.post('/transactions', create)
    app.delete('/transactions/:id', remove)
}