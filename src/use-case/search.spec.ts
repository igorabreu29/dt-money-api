import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryTransactionsRepository } from "../repositories/in-memory/in-memory-transactions-repository";
import { SearchTransactionsUseCase } from "./search";

let transactionRepository: InMemoryTransactionsRepository
let sut: SearchTransactionsUseCase

describe('create transaction', () => {
    beforeEach(() => {
        transactionRepository = new InMemoryTransactionsRepository()
        sut = new SearchTransactionsUseCase(transactionRepository)
    })

    it('should be able to search for transactions', async () => {
        await transactionRepository.create({
            description: 'TypeScript',
            category: 'testing',
            price: 30,
            type: 'outcome'
        })

        await transactionRepository.create({
            description: 'JavaScript',
            category: 'test',
            price: 40,
            type: 'outcome'
        })

        await transactionRepository.create({
            description: 'Node',
            category: 'test',
            price: 40,
            type: 'outcome'
        })

        const { transactions } = await sut.execute('Script')
        
        expect(transactions).toHaveLength(2)
        expect(transactions).toEqual([
            expect.objectContaining({
                description: 'TypeScript'
            }),
            
            expect.objectContaining({
                description: 'JavaScript'
            }),
        ])
    }) 
})