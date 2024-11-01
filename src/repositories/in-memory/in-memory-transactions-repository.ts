import { randomUUID } from 'node:crypto'
import type { Transaction } from '@prisma/client'
import type {
  CreateTransactionData,
  TransactionRepository,
} from '../transaction-repository'

export class InMemoryTransactionsRepository implements TransactionRepository {
  public transactions: Transaction[] = []

  async create(data: CreateTransactionData) {
    const createTransaction: Transaction = {
      id: randomUUID(),
      category: data.category,
      description: data.description,
      price: data.price,
      type: data.type,
      startDate: new Date(),
    }

    this.transactions.push(createTransaction)

    return createTransaction
  }

  async findById(id: string) {
    const findTransactionById = this.transactions.find((transaction) => {
      return transaction.id === id
    })

    if (!findTransactionById) {
      return null
    }

    return findTransactionById
  }

  async findByDescription(description: string) {
    const findTransactionByDescription = this.transactions.find(
      (transaction) => {
        return transaction.description === description
      },
    )

    if (!findTransactionByDescription) {
      return null
    }

    return findTransactionByDescription
  }

  async findMany() {
    return this.transactions
  }

  async searchMany(query: string) {
    const searchManyTransactions = this.transactions
      .sort((a, b) => {
        return b.startDate.getTime() - a.startDate.getTime()
      })
      .filter((transaction) => {
        return transaction.description.includes(query)
      })

    return searchManyTransactions
  }

  async remove(id: string): Promise<void> {
    const findIndexTransaction = this.transactions.findIndex((transaction) => {
      return transaction.id === id
    })
    console.log(findIndexTransaction)

    this.transactions.splice(findIndexTransaction, 1)
  }
}
