import cors from '@fastify/cors'
import fastify from 'fastify'
import { ZodError } from 'zod'
import { transactionRouter } from './http/controllers/route'

export const app = fastify()

app.register(cors, {
  origin: true,
})

app.register(transactionRouter)

app.setErrorHandler((err, _, res) => {
  if (err instanceof ZodError) {
    res.status(400).send({
      message: 'Validation Error',
      issues: err.format(),
    })
  }

  console.log(err)

  return res.status(500).send({ message: 'Internal Server Error.' })
})
