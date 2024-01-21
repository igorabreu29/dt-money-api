import { Either, left, right } from "../core/either";
import { TransactionRepository } from "../repositories/transaction-repository";
import { ResourceNotFoundError } from "./errors/resourse-not-found-error";

type RemoveTransactionUseCaseResponse = Either<ResourceNotFoundError, {}>

export class RemoveTransactionUseCase {
    constructor(
        private transactionRepository: TransactionRepository
    ) {}

    async execute(id: string): Promise<RemoveTransactionUseCaseResponse> {
        const transactionExist = await this.transactionRepository.findById(id) 

        if (!transactionExist) {
            return left(new ResourceNotFoundError())
        }

        await this.transactionRepository.remove(transactionExist.id)

        return right({})
    }
}