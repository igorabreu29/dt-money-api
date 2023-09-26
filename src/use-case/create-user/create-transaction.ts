import { Transaction } from "../../entities/Transaction";
import { CreateTransactionRepository } from "../../repositories/CreateTransactionRepository";

interface CreateTransactionRequest {
    description: string
    type: string
    price: number
    category: string
}

type CreateTransactionResponse = Transaction

export class CreateTransaction {
    constructor(
        private readonly createTransactionRepository: CreateTransactionRepository,
    ) {}

    async execute({ category, description, price, type }: CreateTransactionRequest): Promise<CreateTransactionResponse>{
        try {
            const findByDescription = await this.createTransactionRepository.findByDescription(description)

            if (findByDescription) {
                throw new Error('Transaction Already Exit!')
            }

            const createTransaction = await this.createTransactionRepository.create({
                category,
                description,
                price,
                type
            })

            const transaction = new Transaction(createTransaction)

            return transaction
        } catch(err) {
            return err.message
        }

    }
}