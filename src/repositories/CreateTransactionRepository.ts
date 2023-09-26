import { Transaction } from "../entities/Transaction";

export interface CreateTransactionRepository {
    findByDescription: (description: string) => Promise<Transaction>
    create: (data: Transaction) => Promise<Transaction>
}