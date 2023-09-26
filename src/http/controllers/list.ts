import { FastifyReply, FastifyRequest } from "fastify";
import { makeListTransactionsUseCase } from "../../use-case/factories/make-list-transactions-use-case";

export async function list(req: FastifyRequest, res: FastifyReply) {
    const useCase = makeListTransactionsUseCase()
    
    try {
        const listTransactionUseCase = await useCase.execute()

        return res.status(200).send(listTransactionUseCase)
    } catch(err) { 
        return err
    }
}