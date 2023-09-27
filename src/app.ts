import fastify from "fastify";
import cors from '@fastify/cors'
import { transactionRouter } from "./http/controllers/route";
import { ZodError } from 'zod'

export const app = fastify()

app.register(cors, {
    origin: true
})

app.register(transactionRouter)

app.setErrorHandler((err, _, res) => {
    if (err instanceof ZodError) {
        res
        .status(400)
        .send({
            message: 'Validation Error',
            issues: err.format()
        })
    }

    return res.status(500).send({message: 'Internal Server Error.'})
})