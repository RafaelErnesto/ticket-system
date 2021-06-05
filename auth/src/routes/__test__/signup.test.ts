import request from 'supertest'
import { app } from '../../app'

it('Ensure  can send a signup request to route and get 201 status', async () => {
     await request(app)
        .post('/api/users/signup')
        .send({
            email: 'any@test.com',
            password: 'any_password'
        })
        .expect(201)
})

it('Ensure signup throws when invalid email is sent', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'anytest.com',
            password: 'any_password'
        })
        .expect(400)
})

it('Ensure signup throws when invalid password is sent', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'anytest.com',
            password: '1'
        })
        .expect(400)
})

it('Ensure signup throws when payload is empty', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({})
        .expect(400)
})

it('Ensure signup throws when duplicate email is sent', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'any@test.com',
            password: 'any_password'
        })
        .expect(201)

    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'any@test.com',
            password: 'any_password'
        })
        .expect(400)
})

it('Ensure a cookie is set after request signup', async () => {
    const response = await request(app)
        .post('/api/users/signup')
        .send({
            email: 'any@test.com',
            password: 'any_password'
        })
        .expect(201)
    
    expect(response.get('Set-Cookie')).toBeDefined()
})