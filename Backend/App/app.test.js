import app from './app.js'
import request from 'supertest'

describe('GET /login', () => {
    it('should login correctly with 200 status code', async () => {
        const response = await request(app).post('/login').send({
            userNameOrEmail: 'khaled',
            password: '12345678',
        })
        expect(response.status).toBe(200)
    }, 5000)
    it('get the creation message', async () => {
        const response = await request(app).post('/login').send({
            userNameOrEmail: 'khaled',
            password: '12345678',
        })
        expect(response.body.message).toEqual('Logged in successfully')
    }, 5000)
})


