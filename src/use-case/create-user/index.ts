import { SQLiteCreateTransactionRepository } from "../../repositories/implementations/sqlite-create-transaction-repository";
import { CreateTransactionController } from "./create-transaction-controller";
import { CreateTransaction } from "./create-transaction";

const sqliteCreateTransactionRepository = new SQLiteCreateTransactionRepository()

const createTransaction = new CreateTransaction(sqliteCreateTransactionRepository)
export const createTransactionController = new CreateTransactionController(createTransaction)