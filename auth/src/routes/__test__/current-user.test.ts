import request from 'supertest'
import { app } from '../../app'

it('Ensure currentuser route returns current user data', async () => {
     const authResponse = await request(app)
        .post('/api/users/signup')
        .send({
            email: 'any@test.com',
            password: 'any_password'
        })
        .expect(201)
    
    const cookie = authResponse.get('Set-Cookie')

    const response = await request(app)
        .get('/api/users/currentuser')
        .set('Cookie', cookie)
        .send()
        .expect(200)
        expect(response.body.currentUser.email).toEqual('any@test.com')
})

it('Ensure currentuser route returns nulll if user is not authenticated', async () => {
    
   const response = await request(app)
       .get('/api/users/currentuser')
       .send()
       .expect(200)

       expect(response.body.currentUser).toEqual(null)
})

