import { TransactionRepository } from "../repositories/transaction-repository";
import { ResourceNotFoundError } from "./errors/resourse-not-found-error";

interface RemoveTransactionUseCaseResponse {
    message: string
}

export class RemoveTransactionUseCase {
    constructor(
        private transactionRepository: TransactionRepository
    ) {}

    async execute(id: string): Promise<void> {
        const transactionExist = await this.transactionRepository.findById(id) 

        if (!transactionExist) {
            throw new ResourceNotFoundError()
        }

        await this.transactionRepository.remove(transactionExist.id)
    }
}