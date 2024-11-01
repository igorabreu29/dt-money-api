import type { Transaction } from '@prisma/client'
import { type Either, right } from '../core/either'
import type { TransactionRepository } from '../repositories/transaction-repository'

type ListTransactionsUseCaseResponse = Either<
  null,
  { transactions: Transaction[] }
>

export class ListTransactionsUseCase {
  constructor(private transactionRepository: TransactionRepository) {}

  async execute(): Promise<ListTransactionsUseCaseResponse> {
    const transactions = await this.transactionRepository.findMany()

    return right({
      transactions,
    })
  }
}
