import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from 'supertest'

import { app } from "../../app";
import { prisma } from "../../libs/prisma";

describe('list all transactions', () => {
    beforeAll(async () => await app.ready())
    afterAll(async () => await app.close())

    it('should be able to list all transactions', async () => {
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
            .get('/transactions')

        expect(response.statusCode).toEqual(200)
        expect(response.body.transactions).toEqual([
            expect.objectContaining({
                id: expect.any(String),
                description: 'JavaScript Course'
            }),

            expect.objectContaining({
                id: expect.any(String),
                description: 'TypeScript Course'
            }),
        ])
    })
})