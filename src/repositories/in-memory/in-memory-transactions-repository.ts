import { Transaction } from "@prisma/client";
import { prisma } from "../../database/prisma";
import { CreateTransactionData, TransactionRepository } from "../transaction-repository";
import { randomUUID } from "crypto";

export class InMemoryTransactionsRepository implements TransactionRepository {
    public transactions: Transaction[] = []

    async create(data: CreateTransactionData): Promise<Transaction> {
        const createTransaction: Transaction = {
            id: randomUUID(),
            category: data.category,
            description: data.description,
            price: data.price,
            type: data.type,
            startDate: new Date()
        }

        this.transactions.push(createTransaction)

        return createTransaction
    }


    async findById(id: string): Promise<Transaction> {
        const findTransactionById = this.transactions.find(transaction => {
            return transaction.id === id
        })

        return findTransactionById
    }

   async findByDescription (description: string): Promise<Transaction> {
        const findTransactionByDescription = this.transactions.find(transaction => {
            return transaction.description === description
        })

        return findTransactionByDescription
    }   

    async findMany() {
        return this.transactions
    }

    async searchMany(query: string) {
        const searchManyTransactions = this.transactions.filter(transaction => {
            return transaction.description.includes(query)
        })

        return searchManyTransactions
    }

   async remove(id: string): Promise<void> {
        const findIndexTransaction = this.transactions.findIndex(transaction => {
            return transaction.id === id
        })
        console.log(findIndexTransaction)

        this.transactions.splice(findIndexTransaction, 1)
   }
}