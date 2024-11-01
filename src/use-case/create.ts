import type { Transaction } from '@prisma/client'
import { type Either, left, right } from '../core/either'
import type { TransactionRepository } from '../repositories/transaction-repository'
import { TransactionAlreadyExistError } from './errors/transaction-already-exist-error'

interface CreateTransactionUseCaseRequest {
  description: string
  type: string
  price: number
  category: string
}

type CreateTransactionUseCaseResponse = Either<
  TransactionAlreadyExistError,
  {
    transaction: Transaction
  }
>

export class CreateTransactionUseCase {
  constructor(private transactionRepository: TransactionRepository) {}

  async execute({
    category,
    description,
    price,
    type,
  }: CreateTransactionUseCaseRequest): Promise<CreateTransactionUseCaseResponse> {
    const transactionAlreadyExist =
      await this.transactionRepository.findByDescription(description)

    if (transactionAlreadyExist) {
      return left(new TransactionAlreadyExistError())
    }

		const transaction = await this.transactionRepository.create({
			category,
			description,
			price,
			type,
		})

    return right({
      transaction,
    })
  }
}
