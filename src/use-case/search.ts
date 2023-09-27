import { Transaction } from "@prisma/client";
import { TransactionRepository } from "../repositories/transaction-repository";

interface SearchTransactionsUseCaseResponse {
    transactions: Transaction[]
}

export class SearchTransactionsUseCase {
    constructor(
        private transactionRepository: TransactionRepository
    ) {}

    async execute(query: string): Promise<SearchTransactionsUseCaseResponse> {
        const transactions = await this.transactionRepository.searchMany(query)

        return {
            transactions
        }
    }
}