import { Transaction } from "../../entities/Transaction";
import { GetTransactionRepository } from "../../repositories/GetTransactionRepository";

export class InMemoryGetTransactionRepositories implements GetTransactionRepository {
    private transactions = []

    async getTransactions(): Promise<Transaction[]> {
        return this.transactions
    }
}