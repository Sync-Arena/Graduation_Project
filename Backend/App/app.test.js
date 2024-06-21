import app from './app.js'
import request from 'supertest'

describe('GET /fortest', () => {
    it('should respond with 200 and get hello message', async () => {
        
        const response = await request(app).get('/fortest')
        expect(response.status).toBe(200)
        expect(response.body).toEqual({ message: 'hello from our ColabCode API' })
    }, 5000)
})


