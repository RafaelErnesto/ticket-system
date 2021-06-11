import express, { Request, Response } from 'express'
import { Ticket } from '../models/ticket'

const router = express.Router()

router.get('/api/tickets', async (req: Request, res: Response) => {
    const response =  await Ticket.find({})

    res.send(response)
})

export { router as indexTicketRouter }