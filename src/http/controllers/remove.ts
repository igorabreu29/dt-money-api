import { FastifyReply, FastifyRequest } from "fastify";
import { makeRemoveUseCase } from "../../use-case/factories/make-remove-use-case";
import { z } from 'zod'

export async function remove(req: FastifyRequest, res: FastifyReply) {
    const routeParamsSchema = z.object({
        id: z.string()
    })

    const { id } = routeParamsSchema.parse(req.params)

    const useCase = makeRemoveUseCase()

    const result = await useCase.execute(id)

    if (result.isLeft()) {
        return res.status(400).send({ message: result.value.message })
    }

    return res.status(204).send()
}