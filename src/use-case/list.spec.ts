import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryTransactionsRepository } from '../repositories/in-memory/in-memory-transactions-repository'
import { ListTransactionsUseCase } from './list'

let transactionRepository: InMemoryTransactionsRepository
let sut: ListTransactionsUseCase

describe('create transaction', () => {
  beforeEach(() => {
    transactionRepository = new InMemoryTransactionsRepository()
    sut = new ListTransactionsUseCase(transactionRepository)
  })

  it('should be able to create a transaction', async () => {
    await transactionRepository.create({
      description: 'test-description',
      category: 'testing',
      price: 100,
      type: 'income',
    })

    await transactionRepository.create({
      description: 'test-des',
      category: 'test',
      price: 200,
      type: 'income',
    })

    const result = await sut.execute()

    expect(result.value?.transactions).toHaveLength(2)
    expect(result.value?.transactions).toEqual([
      expect.objectContaining({
        description: 'test-description',
      }),

      expect.objectContaining({
        description: 'test-des',
      }),
    ])
  })
})
