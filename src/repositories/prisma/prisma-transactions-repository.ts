import { Transaction } from "@prisma/client";
import { prisma } from "../../database/prisma";
import { TransactionRepository } from "../transaction-repository";

export class PrismaTransactionRepository implements TransactionRepository {
    async create(data: Transaction): Promise<Transaction> {
        const transactionData = await prisma.transaction.create({data})

        return transactionData
    }


    async findById(id: string): Promise<Transaction> {
        const findTransaction = await prisma.transaction.findUniqueOrThrow({
            where: {
                id
            }
        })

        return findTransaction
   }

   async findByDescription (description: string): Promise<Transaction> {
        const findTransactionByDescription = await prisma.transaction.findFirst({
                    where: {
                        description
                    }
                })

        return findTransactionByDescription
    }   

    async findMany(): Promise<Transaction[]> {
        const transactionsData = await prisma.transaction.findMany()

        return transactionsData
    }

    async searchMany(query: string) {
        const searchTransaction = await prisma.transaction.findMany({
            where: {
                description: {
                    contains: query
                }
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