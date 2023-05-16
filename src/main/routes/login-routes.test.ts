import request from 'supertest'
import app from '../config/app'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import { Collection } from 'mongodb'
import { hash } from 'bcrypt'

let accountColletion: Collection

describe('Login Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    accountColletion = MongoHelper.getCollection('accounts')
    await accountColletion.deleteMany({})
  })

  describe('POST /signup', () => {
    test('should return 200 on signup', async () => {
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
  describe('POST /login', () => {
    test('should return 200 on login', async () => {
      const password = await hash('123123', 12)
      await accountColletion.insertOne({
        name: 'Nícolas',
        email: 'nicolasscorzelli@gmail.com',
        password
      })
      await request(app)
        .post('/api/login')
        .send({
          email: 'nicolasscorzelli@gmail.com',
          password: '123123'
        })
        .expect(200)
    })
  })
})
