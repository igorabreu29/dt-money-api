import { SQLiteGetTransactionRepository } from "../../repositories/implementations/sqlite-get-transaction-repository";
import { ListTransactionsController } from "./list-transactions-controller";
import { ListTransactions } from "./list-transactions";

const sqliteGetTransactionRepository = new SQLiteGetTransactionRepository()

const listTransactions = new ListTransactions(sqliteGetTransactionRepository)
export const listTransactionsController = new ListTransactionsController(listTransactions)