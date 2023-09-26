import { Transaction } from "@prisma/client"

export interface TransactionRepository {
    findByDescription: (description: string) => Promise<Transaction>
    findById: (id: string) => Promise<Transaction>
    create: (data: Transaction) => Promise<Transaction>
    findMany: () => Promise<Transaction[]>
    remove: (id: string) => Promise<void>
    searchMany: (query: string) => Promise<Transaction | Transaction[]> 
}