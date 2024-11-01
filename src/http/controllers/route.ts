import type { FastifyInstance } from 'fastify'
import { create } from './create'
import { list } from './list'
import { remove } from './remove'
import { search } from './search'

export async function transactionRouter(app: FastifyInstance) {
  app.get('/transactions', list)
  app.get('/transactions/search', search)

  app.post('/transactions', create)
  app.delete('/transactions/:id', remove)
}
