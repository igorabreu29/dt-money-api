import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from 'supertest'

import { prisma } from "../../database/prisma";
import { app } from "../../app";

describe('remove transaction', () => {
    beforeAll(async () => await app.ready())
    afterAll(async () => await app.close())

    it('should be able to remove a transaction', async () => {
        await prisma.transaction.create({
            data: {
                description: 'JavaScript Course',
                type: 'outcome',
                price: 550,
                category: 'course'
            },
        })

        const transaction = await prisma.transaction.create({
            data: {
                description: 'TypeScript Course',
                type: 'outcome',
                price: 550,
                category: 'course'
            },
        })

        const response = await request(app.server)
        .delete(`/transactions/${transaction.id}`)

        expect(response.statusCode).toEqual(204)
    })
})