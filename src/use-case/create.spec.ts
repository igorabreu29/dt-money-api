import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryTransactionsRepository } from "../repositories/in-memory/in-memory-transactions-repository";
import { CreateTransactionUseCase } from "./create";
import { TransactionAlreadyExistError } from "./errors/transaction-already-exist-error";

let transactionRepository: InMemoryTransactionsRepository
let createTransactionUseCase: CreateTransactionUseCase

describe('create transaction', () => {
    beforeEach(() => {
        transactionRepository = new InMemoryTransactionsRepository()
        createTransactionUseCase = new CreateTransactionUseCase(transactionRepository)
    })

    it('should be able to create a transaction', async () => {
        const { transaction } = await createTransactionUseCase.execute({
            description: 'test-description',
            category: 'testing',
            price: 100,
            type: 'income'
        })

        expect(transaction).toEqual(
            expect.objectContaining({
                id: expect.any(String)
            })
        )

        expect(transaction.description).toEqual('test-description')
    })

    it('should not be able to create a transaction', async () => {
        await createTransactionUseCase.execute({
            description: 'test-description',
            category: 'testing',
            price: 100,
            type: 'income'
        })

        await expect(async () => await createTransactionUseCase.execute({
            description: 'test-description',
            category: 'test',
            price: 200,
            type: 'outcome'
        })).rejects.toBeInstanceOf(TransactionAlreadyExistError)
    })
})