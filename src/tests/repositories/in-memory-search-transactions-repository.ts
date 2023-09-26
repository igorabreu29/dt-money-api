import { Transaction } from "../../entities/Transaction";
import { SearchTransactionRepository } from "../../repositories/search-transactions-repository";

export class InMemorySearchTransactionRepository implements SearchTransactionRepository {
    private transactions: Transaction[] = []
    
    async search(query: string) {
        const searchTransaction = this.transactions.filter(transaction => transaction.description.includes(query))

        return searchTransaction
    }
}