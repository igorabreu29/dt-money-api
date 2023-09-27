import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryTransactionsRepository } from "../repositories/in-memory/in-memory-transactions-repository";
import { ListTransactionsUseCase } from "./list-transactions";

let transactionRepository: InMemoryTransactionsRepository
let listTransactionsUseCase: ListTransactionsUseCase

describe('create transaction', () => {
    beforeEach(() => {
        transactionRepository = new InMemoryTransactionsRepository()
        listTransactionsUseCase = new ListTransactionsUseCase(transactionRepository)
    })

    it('should be able to create a transaction', async () => {        
        await transactionRepository.create({
            description: 'test-description',
            category: 'testing',
            price: 100,
            type: 'income'
        })

        await transactionRepository.create({
            description: 'test-des',
            category: 'test',
            price: 200,
            type: 'income'
        })

        const { transactions } = await listTransactionsUseCase.execute()

        expect(transactions).toHaveLength(2)
        expect(transactions).toEqual([
            expect.objectContaining({
                description: 'test-description'
            }),

            expect.objectContaining({
                description: 'test-des'
            })
        ])
    })
})