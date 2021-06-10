import express, { Request, Response } from 'express'
import { requireAuth, validateRequest } from '@rfltickets/common'
import { body } from 'express-validator'

const router = express.Router()

router.post('/api/tickets', requireAuth, [
    body('title').not().isEmpty().withMessage('Title is required'),
    body('price').isFloat({ gt: 0 }).withMessage('Price is required and must be greater than 0')
], validateRequest, (req: Request, res: Response) => {
    res.status(200).send({})
})

export { router as newRouter }