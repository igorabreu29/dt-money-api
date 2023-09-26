import { Transaction } from "../../entities/Transaction";
import { CreateTransactionRepository } from "../../repositories/CreateTransactionRepository";

export class InMemoryCreateTransactionRepositories implements CreateTransactionRepository {
    private transactions: Transaction[] = [
        {
            id: '1010',
            category: 'sopa',
            description: 'sopamaisum',
            price: 20,
            type: 'income',
            startDate: new Date()
        }
    ]

    async findByDescription(description: string): Promise<Transaction> {
        const findTransactionByDescription = this.transactions.find(transaction => transaction.description === description)

        return findTransactionByDescription
    };

    async create(data: Transaction): Promise<Transaction> {
        const createNewTransaction: Transaction = {
            id: data.id,
            category: data.category,
            description: data.description,
            price: data.price,
            type: data.type,
            startDate: data.startDate
        }

        const transaction = new Transaction(createNewTransaction)
        
        this.transactions.push(transaction)

        return transaction
    };
}