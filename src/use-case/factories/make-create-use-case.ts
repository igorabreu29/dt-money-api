import { PrismaTransactionRepository } from '../../repositories/prisma/prisma-transactions-repository'
import { CreateTransactionUseCase } from '../create'

export function makeCreateUseCase() {
  const transactionRepository = new PrismaTransactionRepository()
  const useCase = new CreateTransactionUseCase(transactionRepository)

  return useCase
}
