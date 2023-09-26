import { Transaction } from "../entities/Transaction";

export interface SearchTransactionRepository {
    search: (query: string) => Promise<Transaction | Transaction[]> 
}