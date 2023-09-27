import { Transaction } from "@prisma/client"
import { TransactionRepository } from "../repositories/transaction-repository"

interface ListTransactionsUseCaseResponse {
    transactions: Transaction[]
} 

export class ListTransactionsUseCase {
    constructor (
        private transactionRepository: TransactionRepository,
    ) {}

    async execute(): Promise<ListTransactionsUseCaseResponse> {
        const transactions = await this.transactionRepository.findMany()

        return {
            transactions,
        }
    }
}