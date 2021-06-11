import request from 'supertest'
import { app } from '../../app'
import { Ticket } from '../../models/ticket'

it('Ensure has a route handler listening to /api/tickets for post requests', async () => {
    const response = await request(app)
                    .post('/api/tickets')
                    .send({})
    expect(response.statusCode).not.toEqual(404)
})


it('Ensure that can be access if user is signed in', async () => {
    const response = await request(app)
                    .post('/api/tickets')
                    .send({})
    expect(response.status).toEqual(401)
})

it('Returns status different than 401 if user is signed in', async () => {
    const response = await request(app)
                    .post('/api/tickets')
                    .set('Cookie', global.signin())
                    .send({})
    expect(response.status).not.toEqual(401)
})


it('Returns error if title is invalid', async () => {
    await request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({
            title: '',
            price: 10
        })
        .expect(400)
    
        await request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({
            price: 10
        })
        .expect(400)
})


it('return error if price is invalid', async () => {
    await request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({
            title: 'any_title',
            price: -10
        })
        .expect(400)


        await request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({
            title: 'any_title',
        })
        .expect(400)
})


it('Creates a ticket with valid inputs', async () => {

   const response =  await request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({
            title: 'any_title',
            price: 1
        })
        .expect(201)
        
    let tickets = await Ticket.find({})

    expect(tickets.length).toEqual(1)

})