import { Router, Request, Response } from 'express'
import {BadRequestError, NotFoundError, OrderStatus, requireAuth, validateRequest} from '@rfltickets/common'
import { body } from 'express-validator'
import { Ticket } from '../models/ticket'
import { Order } from '../models/order'

const router = Router()

router.post('/api/orders', requireAuth, [
    body('ticketId')
    .not()
    .isEmpty()
    .withMessage('TicketId must be provided')
], async (req: Request, res: Response) => {
    const { ticketId } = req.body

    const ticket = await Ticket.findById(ticketId)
    if(!ticket) {
        throw new NotFoundError()
    }

    const existingOrder  = await Order.findOne({
        ticket: ticket,
        status: {
            $in: [
                OrderStatus.Created,
                OrderStatus.AwaitingPayment,
                OrderStatus.Complete
            ]
        }
    })

    if(existingOrder) {
        throw new BadRequestError('Ticket already reserved')
    }

    res.send({})
})

export {router as newRouter}