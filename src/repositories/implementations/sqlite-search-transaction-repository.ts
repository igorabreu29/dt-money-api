import { prisma } from "../../database/prisma";
import { SearchTransactionRepository } from "../search-transactions-repository";

export class SqliteSearchTransactionRepository implements SearchTransactionRepository {
   async search(query: string) {
        const searchTransaction = await prisma.transaction.findMany({
            where: {
                description: {
                    contains: query
                }
            }
        })

        return searchTransaction
   }
}