import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryTransactionsRepository } from '../repositories/in-memory/in-memory-transactions-repository'
import { CreateTransactionUseCase } from './create'
import { TransactionAlreadyExistError } from './errors/transaction-already-exist-error'

let transactionRepository: InMemoryTransactionsRepository
let sut: CreateTransactionUseCase

describe('create transaction', () => {
  beforeEach(() => {
    transactionRepository = new InMemoryTransactionsRepository()
    sut = new CreateTransactionUseCase(transactionRepository)
  })

  it('should not be able to create a transaction with the same description', async () => {
    await sut.execute({
      description: 'test-description',
      category: 'testing',
      price: 100,
      type: 'income',
    })

    const result = await sut.execute({
      description: 'test-description',
      category: 'testing',
      price: 100,
      type: 'income',
    })

    expect(result.value).toBeInstanceOf(TransactionAlreadyExistError)
  })

  it('should be able to create a transaction', async () => {
    const result = await sut.execute({
      description: 'test-description',
      category: 'testing',
      price: 100,
      type: 'income',
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toMatchObject({
      transaction: expect.objectContaining({
        id: expect.any(String),
        description: 'test-description',
      }),
    })
  })
})
