import { Request, Response, NextFunction, RequestHandler } from 'express'
import Joi from 'joi'
import BadRequestError from '../errors/bad-request'

function validationMiddleware(schema: Joi.Schema) {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const validationOptions = {
            abortEarly: false,
            allowUnknown: true,
            stripUnknown:true,
        }
        try {
            const value = await schema.validateAsync(req.body, validationOptions)
            req.body = value
            next()
        } catch (err: any) {
            const errors: string[] = []
            err.details.forEach((error: Joi.ValidationErrorItem) => {
                errors.push(error.message)
            })
            throw new BadRequestError(`${errors}`)
        }
    }
}

export default validationMiddleware