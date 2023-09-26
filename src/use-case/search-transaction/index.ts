import { SqliteSearchTransactionRepository } from "../../repositories/implementations/sqlite-search-transaction-repository";
import { SearchTransaction } from "./search-transaction";
import { SearchTransationController } from "./search-transaction-controller";

const sqliteSearchTransactionRepository = new SqliteSearchTransactionRepository()
const searchTransactionUseCase = new SearchTransaction(sqliteSearchTransactionRepository)

export const searchTransactionController = new SearchTransationController(searchTransactionUseCase)