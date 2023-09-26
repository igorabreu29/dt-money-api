import { PrismaTransactionRepository } from "../../repositories/prisma/prisma-transactions-repository";
import { ListTransactionsUseCase } from "../list-transactions";

export function makeListTransactionsUseCase() {
    const transactionRepository = new PrismaTransactionRepository()
    const useCase = new ListTransactionsUseCase(transactionRepository)

    return useCase
}