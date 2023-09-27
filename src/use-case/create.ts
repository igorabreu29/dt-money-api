import { Transaction } from "@prisma/client";
import { TransactionRepository } from "../repositories/transaction-repository";
import { TransactionAlreadyExistError } from "./errors/transaction-already-exist-error";

interface CreateTransactionUseCaseRequest {
    description: string
    type: string
    price: number
    category: string
}

interface CreateTransactionUseCaseResponse {
    transaction: Transaction
}

export class CreateTransactionUseCase {
    constructor(
        private transactionRepository: TransactionRepository
    ) {}

    async execute({ category, description, price, type }: CreateTransactionUseCaseRequest): Promise<CreateTransactionUseCaseResponse> {
        const transactionAlreadyExist = await this.transactionRepository.findByDescription(description)

        if (transactionAlreadyExist) {
            throw new TransactionAlreadyExistError()
        }

        const transaction = await this.transactionRepository.create({
            category,
            description,
            price,
            type
        })

        return {
            transaction
        }
    }
}