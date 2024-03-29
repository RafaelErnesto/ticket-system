import  mongoose  from 'mongoose'
import request from   'supertest'
import { app } from '../../app'

it('returns a 404 if the provided id does not exist', async () => {
    const id = new mongoose.Types.ObjectId().toHexString()
    await request(app)
        .put(`/api/tickets/${id}`)
        .set('Cookie', global.signin())
        .send({
            title: 'updated_title',
            price: 20
        })
        .expect(404)
})

it('returns a 401 if the user is not authenticated', async () => {
    const id = new mongoose.Types.ObjectId().toHexString()
    await request(app)
        .put(`/api/tickets/${id}`)
        .send({
            title: 'updated_title',
            price: 20
        })
        .expect(401)
})

it('returns a 401 if user does not own the ticket', async () => {
   const response =  await request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({
            title: 'any_title',
            price: 1
        })

    await request(app)
        .put(`/api/tickets/${response.body.id}`)
        .set('Cookie', global.signin())
        .send( {
            title: 'updated_title',
            price: 2
        })
        .expect(401)
})

it('returns a 400 if the user provied an invalid title or price', async () => {
    const cookie = global.signin()

    const response =  await request(app)
        .post('/api/tickets')
        .set('Cookie', cookie)
        .send({
            title: 'any_title',
            price: 1
        })

        await request(app)
        .put(`/api/tickets/${response.body.id}`)
        .set('Cookie', cookie)
        .send( {
            title: 2,
            price: 2
        })
        .expect(400)

        await request(app)
        .put(`/api/tickets/${response.body.id}`)
        .set('Cookie', cookie)
        .send( {
            title: 'any_title',
            price: 'any_price'
        })
        .expect(400)
})

it('returns 200 if the ticket was successfully updated', async () => {
    const cookie = global.signin()

    const response =  await request(app)
    .post('/api/tickets')
    .set('Cookie', cookie)
    .send({
        title: 'any_title',
        price: 1
    })

    await request(app)
        .put(`/api/tickets/${response.body.id}`)
        .set('Cookie', cookie)
        .send( {
            title: 'updated_title',
            price: 2
        })
        .expect(200)

})