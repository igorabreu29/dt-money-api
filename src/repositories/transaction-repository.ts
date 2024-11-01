import type { Transaction } from '@prisma/client'

export interface CreateTransactionData {
  description: string
  type: string
  category: string
  price: number
}

export interface TransactionRepository {
  findByDescription: (description: string) => Promise<Transaction | null>
  findById: (id: string) => Promise<Transaction | null>
  create: (data: CreateTransactionData) => Promise<Transaction>
  findMany: () => Promise<Transaction[]>
  remove: (id: string) => Promise<void>
  searchMany: (
    query: string,
    orderBy?: string,
    order?: string,
  ) => Promise<Transaction[]>
}
