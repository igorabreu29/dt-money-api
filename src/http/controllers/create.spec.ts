import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from 'supertest'
import { app } from "../../app";

describe('create transaction', () => {
    beforeAll(async () => await app.ready())
    afterAll(async () => await app.close())

    it('should be able to create transaction', async () => {
        const response = await request(app.server)
        .post('/transactions')
        .send({
            description: 'testing',
            type: 'income',
            price: 200,
            category: 'test'
        })
        .expect(201)

        expect(response.body.transaction).toEqual(
            expect.objectContaining({
                id: expect.any(String)
            })
        )
    })
})