import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryTransactionsRepository } from "../repositories/in-memory/in-memory-transactions-repository";
import { SearchTransactionsUseCase } from "./search";
import { resolve } from "dns";

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

        const result = await sut.execute({ query: 'Script' })
        
        expect(result.value?.transactions).toHaveLength(2)
        expect(result.value?.transactions).toEqual([
            expect.objectContaining({
                description: 'TypeScript'
            }),
            
            expect.objectContaining({
                description: 'JavaScript'
            }),
        ])
    }) 

    it ('should be able to search for transactions and get in order of more recent', async () => {
        await transactionRepository.create({
            description: 'TypeScript',
            category: 'test',
            price: 40,
            type: 'outcome'
        })

        await new Promise(resolve => setTimeout(resolve, 200))

        await transactionRepository.create({
            description: 'JavaScript',
            category: 'test',
            price: 40,
            type: 'outcome'        
        })

        const result = await sut.execute({ query: 'Script' })  

        expect(result.value?.transactions).toEqual([
            expect.objectContaining({
                description: 'JavaScript'
            }),
            expect.objectContaining({
                description: 'TypeScript'
            }),
        ])
    })
})