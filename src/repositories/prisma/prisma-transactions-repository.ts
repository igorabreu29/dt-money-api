import { Transaction } from "@prisma/client";
import { prisma } from "../../libs/prisma";
import { CreateTransactionData, TransactionRepository } from "../transaction-repository";

export class PrismaTransactionRepository implements TransactionRepository {
    async create(data: CreateTransactionData): Promise<Transaction> {
        const transaction = await prisma.transaction.create({data})

        return transaction
    }


    async findById(id: string) {
        const findTransaction = await prisma.transaction.findUniqueOrThrow({
            where: {
                id
            }
        })

        return findTransaction
   }

   async findByDescription (description: string) {
        const findTransactionByDescription = await prisma.transaction.findFirst({
            where: {
                description
            }
        })

        return findTransactionByDescription
    }   

    async findMany() {
        const transactions = await prisma.transaction.findMany()

        return transactions
    }

    async searchMany(query: string) {
        const searchTransaction = await prisma.transaction.findMany({
            where: {
                description: {
                    contains: query
                }
            },
            orderBy: {
                startDate: 'desc'
            }
        })

        return searchTransaction
    }

   async remove (id: string): Promise<void> {
        await prisma.transaction.delete({
            where: {
                id
            }
        })
   }

}