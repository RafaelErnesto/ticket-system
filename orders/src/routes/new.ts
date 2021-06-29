import { Router, Request, Response } from 'express'
import {requireAuth, validateRequest} from '@rfltickets/common'
import { body } from 'express-validator'

const router = Router()

router.post('/api/orders', requireAuth, [
    body('ticketId')
    .not()
    .isEmpty()
    .withMessage('TicketId must be provided')
], async (req: Request, res: Response) => {
    res.send({})
})

export {router as newRouter}