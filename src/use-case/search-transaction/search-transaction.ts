import { Transaction } from "../../entities/Transaction";
import { SearchTransactionRepository } from "../../repositories/search-transactions-repository";

type SearchTransactionUseCaseResponse = Transaction | Transaction[]

export class SearchTransaction {
    constructor(
        private searchTransactionRepository: SearchTransactionRepository
    ) {}

    async execute(q: string): Promise<SearchTransactionUseCaseResponse> {
        const searchTransaction = await this.searchTransactionRepository.search(q)

        return searchTransaction
    }
}