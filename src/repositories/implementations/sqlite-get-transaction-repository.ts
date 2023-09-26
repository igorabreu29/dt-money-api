import { prisma } from "../../database/prisma";
import { Transaction } from "../../entities/Transaction";
import { GetTransactionRepository } from "../GetTransactionRepository";

export class SQLiteGetTransactionRepository implements GetTransactionRepository {
    async getTransactions(): Promise<Transaction[]> {
        const transactionsData = await prisma.transaction.findMany()

        return transactionsData
    }
}