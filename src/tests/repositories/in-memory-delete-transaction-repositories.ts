import { Transaction } from "../../entities/Transaction";
import { DeleteTransactionRepository } from "../../repositories/DeleteTransactionRepository";

export class InMemoryDeleteTransactionRepositories implements DeleteTransactionRepository {
    private transactions: Transaction[] = []

    async findById(id: string): Promise<Transaction> {
        const findTransactionById = this.transactions.find(transaction => transaction.id === id)

        return findTransactionById
    };
    
    async deleteTransaction(id: string): Promise<void> {
        this.transactions.filter(transaction => transaction.id === id)
    }
}