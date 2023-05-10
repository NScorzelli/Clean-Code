import request from 'supertest'
import app from '../config/app'

describe('SignUp Routes', () => {
  test('should return an account on success', async () => {
    await request(app)
      .post('/api/signup')
      .send({
        name: 'Nícolas',
        email: 'nicolasscorzelli@gmail.com',
        password: '123123',
        passwordConfirmation: '123123'
      })
      .expect(200)
  })
})
