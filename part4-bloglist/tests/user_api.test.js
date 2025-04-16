const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const app = require('../app')
const User = require('../models/user')

const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash('sekret', 10)
  const user = new User({ username: 'root', passwordHash })
  await user.save()
})

test('creation fails if username is too short', async () => {
  const newUser = {
    username: 'pu',
    name: 'Tiny U',
    password: 'validpassword',
  }

  const result = await api.post('/api/users')
    .send(newUser)
    .expect(400)

  expect(result.body.error).toBe('username must be at least 3 characters long')
})

test('creation fails if password is too short', async () => {
  const newUser = {
    username: 'validuser',
    name: 'Short Pass',
    password: 'pw',
  }

  const result = await api.post('/api/users')
    .send(newUser)
    .expect(400)

  expect(result.body.error).toBe('password must be at least 3 characters long')
})

test('creation fails if username is missing', async () => {
  const newUser = {
    name: 'Missing Username',
    password: 'securepass',
  }

  const result = await api.post('/api/users')
    .send(newUser)
    .expect(400)

  expect(result.body.error).toBe('username and password are required')
})

test('creation fails if password is missing', async () => {
  const newUser = {
    username: 'newuser',
    name: 'Missing Password',
  }

  const result = await api.post('/api/users')
    .send(newUser)
    .expect(400)

  expect(result.body.error).toBe('username and password are required')
})

test('creation fails with duplicate username', async () => {
  const newUser = {
    username: 'root',
    name: 'Superuser',
    password: 'secret'
  }

  const result = await api
    .post('/api/users')
    .send(newUser)
    .expect(400)

  expect(result.body.error).toContain('expected `username` to be unique')
})

afterAll(async () => {
  await mongoose.connection.close()
})
