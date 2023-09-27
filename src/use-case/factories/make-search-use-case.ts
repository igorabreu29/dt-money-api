import { PrismaTransactionRepository } from "../../repositories/prisma/prisma-transactions-repository";
import { SearchTransactionsUseCase } from "../search";

export function makeSearchUseCase() {
    const transactionRepository = new PrismaTransactionRepository()
    const useCase = new SearchTransactionsUseCase(transactionRepository)

    return useCase
}