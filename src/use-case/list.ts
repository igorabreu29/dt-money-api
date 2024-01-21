import { Transaction } from "@prisma/client"
import { TransactionRepository } from "../repositories/transaction-repository"
import { Either, right } from "../core/either"

type ListTransactionsUseCaseResponse = Either<null, { transactions: Transaction[] }>

export class ListTransactionsUseCase {
    constructor (
        private transactionRepository: TransactionRepository,
    ) {}

    async execute(): Promise<ListTransactionsUseCaseResponse> {
        const transactions = await this.transactionRepository.findMany()

        return right({
            transactions,
        })
    }
}