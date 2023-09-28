import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from 'supertest'

import { app } from "../../app";
import { prisma } from "../../database/prisma";

describe('search transactions', () => {
    beforeAll(async () => await app.ready())
    afterAll(async () => await app.close())

    it('should be able to search a transaction', async () => {
        await prisma.transaction.create({
            data: {
                description: 'JavaScript Course',
                type: 'outcome',
                price: 550,
                category: 'course'
            },
        })

        await prisma.transaction.create({
            data: {
                description: 'TypeScript Course',
                type: 'outcome',
                price: 550,
                category: 'course'
            },
        })

        const response = await request(app.server)
            .get('/transactions/search?q=type')

        expect(response.statusCode).toEqual(200)
        expect(response.body.transactions).toEqual([
            expect.objectContaining({
                description: 'TypeScript Course'
            }),
        ])
    })
})