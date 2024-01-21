import { Transaction } from "@prisma/client";
import { TransactionRepository } from "../repositories/transaction-repository";
import { Either, right } from "../core/either";

interface SearchTransactionsUseCaseRequest {
    query: string
}

type SearchTransactionsUseCaseResponse = Either<null, {
    transactions: Transaction[]
}>

export class SearchTransactionsUseCase {
    constructor(
        private transactionRepository: TransactionRepository
    ) {}

    async execute({ query }: SearchTransactionsUseCaseRequest): Promise<SearchTransactionsUseCaseResponse> {
        const transactions = await this.transactionRepository.searchMany(query)

        return right({
            transactions
        })
    }
}