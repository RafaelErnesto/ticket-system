import request from 'supertest'
import { app } from '../../app'

it('Ensure  can send a signin request with valid payload and get 201 status', async () => {
     await request(app)
        .post('/api/users/signup')
        .send({
            email: 'any@test.com',
            password: 'any_password'
        })
        .expect(201)

        await request(app)
        .post('/api/users/signin')
        .send({
            email: 'any@test.com',
            password: 'any_password'
        })
        .expect(201)
})

it('Ensure  sigin fails when email that does not exist is supplied', async () => {

       await request(app)
       .post('/api/users/signin')
       .send({
           email: 'any2@test.com',
           password: 'any_password'
       })
       .expect(400)
})

it('Ensure  sigin fails when incorrect passowrd is passed', async () => {

    await request(app)
    .post('/api/users/signup')
    .send({
        email: 'any@test.com',
        password: 'any_password'
    })
    .expect(201)

    await request(app)
    .post('/api/users/signin')
    .send({
        email: 'any@test.com',
        password: 'any'
    })
    .expect(400)
})

