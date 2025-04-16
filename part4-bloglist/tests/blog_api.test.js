// blog_api.test.js
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const api = supertest(app)

let token = ''

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash('test123', 10)
  const user = new User({ username: 'testuser', name: 'Test User', passwordHash })
  await user.save()

  const userForToken = {
    username: user.username,
    id: user._id,
  }

  token = jwt.sign(userForToken, process.env.SECRET)

  const blog = new Blog({
    title: 'First Blog',
    author: 'Author',
    url: 'http://example.com',
    likes: 5,
    user: user._id
  })
  await blog.save()
})

test('a valid blog can be added with a token', async () => {
  const newBlog = {
    title: 'Token Protected Blog',
    author: 'Pujan',
    url: 'http://secured.com',
    likes: 10
  }

  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await Blog.find({})
  expect(blogsAtEnd).toHaveLength(2)
})

test('blog creation fails with 401 if token is missing', async () => {
  const newBlog = {
    title: 'Unauthorized Blog',
    author: 'Pujan',
    url: 'http://fail.com',
    likes: 1
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(401)
})

afterAll(async () => {
  await mongoose.connection.close()
})
