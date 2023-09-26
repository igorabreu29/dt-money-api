import { SQLiteDeleteTransactionRepository } from "../../repositories/implementations/sqlite-delete-transaction-repository";
import { DeleteTransactionController } from "./delete-transaction-controller";
import { DeleteTransaction } from "./delete-transaction";

const sqliteDeleteTransactionRepository = new SQLiteDeleteTransactionRepository()

const deleteTrancactionUseCase = new DeleteTransaction(sqliteDeleteTransactionRepository)
export const deleteTransactionController = new DeleteTransactionController(deleteTrancactionUseCase)