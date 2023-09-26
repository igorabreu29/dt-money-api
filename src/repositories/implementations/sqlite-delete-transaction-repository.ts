import { prisma } from "../../database/prisma";
import { Transaction } from "../../entities/Transaction";
import { DeleteTransactionRepository } from "../DeleteTransactionRepository";

export class SQLiteDeleteTransactionRepository implements DeleteTransactionRepository {
   async findById(id: string): Promise<Transaction> {
        const findTransaction = await prisma.transaction.findUniqueOrThrow({
            where: {
                id
            }
        })

        return findTransaction
   }

   async deleteTransaction (id: string): Promise<void> {
        await prisma.transaction.delete({
            where: {
                id
            }
        })
   }
}