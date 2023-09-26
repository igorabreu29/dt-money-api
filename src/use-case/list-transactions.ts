import { Transaction } from "../entities/Transaction"
import { TransactionRepository } from "../repositories/transaction-repository"

export class ListTransactionsUseCase {
    constructor (
        private readonly transactionRepository: TransactionRepository,
    ) {}

    async execute(): Promise<Transaction[]> {
        const transactions = await this.transactionRepository.findMany()

        return transactions
    }
}