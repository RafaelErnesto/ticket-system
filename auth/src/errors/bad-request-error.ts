import { CustomError } from './custom-error'

export class BadRequestError extends CustomError {
    statusCode = 400
    message: string

    constructor(message: string) {
        super(`Bad request error: ${message}`)
        this.message = message
        Object.setPrototypeOf(this, BadRequestError.prototype)

    }

    serializeErrors() {
        return [
            {
                message: this.message
            }
        ]
    }
}