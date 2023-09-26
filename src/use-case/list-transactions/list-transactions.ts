import { Transaction } from "../../entities/Transaction";
import { GetTransactionRepository } from "../../repositories/GetTransactionRepository";

export class ListTransactions {
    constructor (
        private readonly getTransactionRepository: GetTransactionRepository,
    ) {}

    async execute(): Promise<Transaction[]> {
        const transactions = await this.getTransactionRepository.getTransactions()

        return transactions
    }
}