import { FastifyReply, FastifyRequest } from "fastify";
import { makeRemoveUseCase } from "../../use-case/factories/make-remove-use-case";
import { z } from 'zod'
import { ResourceNotFoundError } from "../../use-case/errors/resourse-not-found-error";

export async function remove(req: FastifyRequest, res: FastifyReply) {
    const routeParamsSchema = z.object({
        id: z.string()
    })

    const { id } = routeParamsSchema.parse(req.params)

    const useCase = makeRemoveUseCase()
    
    try {
        await useCase.execute(id)

        return res.status(204).send()
    } catch(err) { 
        if (err instanceof ResourceNotFoundError) {
            return res.status(400).send({message: err.message})
        }

        throw err
    }
}