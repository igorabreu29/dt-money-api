import { PrismaTransactionRepository } from "../../repositories/prisma/prisma-transactions-repository";
import { RemoveTransactionUseCase } from "../remove";

export function makeRemoveUseCase() {
    const transactionRepository = new PrismaTransactionRepository()
    const useCase = new RemoveTransactionUseCase(transactionRepository)

    return useCase
}