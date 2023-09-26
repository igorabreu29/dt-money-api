import { Transaction } from "../entities/Transaction";

export interface GetTransactionRepository {
    getTransactions: () => Promise<Transaction[]>
}