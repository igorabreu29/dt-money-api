import { Transaction } from "../entities/Transaction";

export interface DeleteTransactionRepository {
    findById: (id: string) => Promise<Transaction>
    deleteTransaction: (id: string) => Promise<void>
}