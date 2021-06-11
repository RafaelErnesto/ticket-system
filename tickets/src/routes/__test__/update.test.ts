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

})

it('returns a 400 if the user provied an invalid title or price', async () => {

})

it('returns 200 if the ticket was successfully updated', async () => {

})