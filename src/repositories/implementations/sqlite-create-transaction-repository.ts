import { prisma } from "../../database/prisma";
import { Transaction } from "../../entities/Transaction";
import { CreateTransactionRepository } from "../CreateTransactionRepository";

export class SQLiteCreateTransactionRepository implements CreateTransactionRepository {
    async findByDescription (description: string): Promise<Transaction> {
        const findTransactionByDescription = await prisma.transaction.findFirst({
            where: {
                description
            }
        })

        return findTransactionByDescription
    }

    async create(data: Transaction ): Promise<Transaction> {
        const transactionData = await prisma.transaction.create({data})

        return transactionData
    }
}