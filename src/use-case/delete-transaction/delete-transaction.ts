import { DeleteTransactionRepository } from "../../repositories/DeleteTransactionRepository";

export class DeleteTransaction {
    constructor (
        private readonly deleteTransactionRepository: DeleteTransactionRepository,
    ) {}

    async execute(id: string) {
        const findTransactionById = await this.deleteTransactionRepository.findById(id)

        if (findTransactionById) {
           return await this.deleteTransactionRepository.deleteTransaction(findTransactionById.id)
        }

        return 'Transaction doesnt exist!'
    }
}