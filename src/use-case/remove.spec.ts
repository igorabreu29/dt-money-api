import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryTransactionsRepository } from "../repositories/in-memory/in-memory-transactions-repository";
import { RemoveTransactionUseCase } from "./remove";
import { ResourceNotFoundError } from "./errors/resourse-not-found-error";

let transactionRepository: InMemoryTransactionsRepository
let removeTransactionUseCase: RemoveTransactionUseCase

describe('remove transaction', () => {
    beforeEach(() => {
        transactionRepository = new InMemoryTransactionsRepository()
        removeTransactionUseCase = new RemoveTransactionUseCase(transactionRepository)
    })

    it('should be able to remove a transaction', async() => {
        await transactionRepository.create({
            description: 'testing-dev',
            category: 'testing',
            price: 30,
            type: 'outcome'
        })

        const transaction = await transactionRepository.create({
            description: 'test-dev',
            category: 'test',
            price: 40,
            type: 'outcome'
        })
        
        await removeTransactionUseCase.execute(transaction.id)

        expect(transactionRepository.transactions).toHaveLength(1)
        expect(transactionRepository.transactions).toEqual([
            expect.objectContaining({
                description: 'testing-dev',
                category: 'testing',
                price: 30,
                type: 'outcome'
            })
        ])
    })

    it('should not be able to remove transaction that not exist', async () => {
        await transactionRepository.create({
            description: 'testing-dev',
            category: 'testing',
            price: 30,
            type: 'outcome'
        })

        await expect(async () => await removeTransactionUseCase.execute('id-not-exist'))
        .rejects
        .toBeInstanceOf(ResourceNotFoundError)
    })
})