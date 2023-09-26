import { describe, it, expect } from 'vitest'
import { Transaction } from './Transaction'

describe('entities transaction test', () => {
    it('should be able to instance class', () => {
        const transaction = new Transaction({
            id: "202020",
            category: 'aobaaoba',
            description: 'monkey',
            price: 20,
            type: 'income',
            startDate: new Date()
        })

        expect(transaction).toBeInstanceOf(Transaction)
    })

    it('should be able to get all data transaction', () => {
        const transaction = new Transaction({
            id: "202020",
            category: 'aobaaoba',
            description: 'monkey',
            price: 20,
            type: 'income',
            startDate: new Date()
        })

        expect(transaction).toEqual({
            id: "202020",
            category: 'aobaaoba',
            description: 'monkey',
            price: 20,
            type: 'income',
            startDate: new Date()
        })
    })

    it('should be able get transaction data minus the id', () => {
        const transaction = new Transaction({
            category: 'aliment',
            description: 'boi',
            price: 100,
            type: 'outcome',
            startDate: new Date()
        })

        expect(transaction).not.toHaveProperty('id')
    })

    it('should be able get transaction data minus the id', () => {
        const transaction = new Transaction({
            id: '202020',
            category: 'aliment',
            description: 'boi',
            price: 100,
            type: 'outcome',
        })

        expect(transaction).toHaveProperty('id')
    })

    it('should be able get transaction data minus the startDate', () => {
        const transaction = new Transaction({
            id: '202020',
            category: 'aliment',
            description: 'boi',
            price: 100,
            type: 'outcome',
        })

        expect(transaction).not.toHaveProperty('startDate')
    })

    it('should be able get transaction data minus the startDate', () => {
        const transaction = new Transaction({
            category: 'aliment',
            description: 'boi',
            price: 100,
            type: 'outcome',
            startDate: new Date()
        })

        expect(transaction).toHaveProperty('startDate')
    })

    it('should be able get transaction without optional property', () => {
        const transaction = new Transaction({
            category: 'aliment',
            description: 'boi',
            price: 100,
            type: 'outcome',
        })

        expect(transaction).toEqual({
            category: 'aliment',
            description: 'boi',
            price: 100,
            type: 'outcome',
        })
    })
})