import request from 'supertest'
import { app } from '../../app'

it('Ensure signout returns 200 and clears the cookie', async () => {
     await request(app)
        .post('/api/users/signup')
        .send({
            email: 'any@test.com',
            password: 'any_password'
        })
        .expect(201)

    const response = await request(app)
        .post('/api/users/signout')
        .send({})
        .expect(200)

        expect(response.get('Set-Cookie')).toBeDefined()
})

