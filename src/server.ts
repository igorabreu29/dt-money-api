import fastify from "fastify";
import cors from '@fastify/cors'
import { transactionRouter } from "./http/controllers/route";


const app = fastify()

app.register(cors, {
    origin: true
})

app.register(transactionRouter)

app.listen({
    port: process.env.PORT ? Number(process.env.PORT) : 3333,
    host: '0.0.0.0'
})
.then(() => console.log('Server running on http://localhost:3333'))