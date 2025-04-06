const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app') // import your express app
const Blog = require('../models/blog')

// Wrap your app in SuperTest
const api = supertest(app)

const initialBlogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'https://example.com',
    likes: 5,
  }
]

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(initialBlogs)
})

test('blogs are returned as JSON', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('correct number of blog posts returned', async () => {
  const response = await api.get('/api/blogs')
  console.log('Blog count:', response.body.length)
  if (response.body.length !== initialBlogs.length) {
    throw new Error('Blog count mismatch')
  }
})

afterAll(async () => {
  await mongoose.connection.close()
})

test('unique identifier is named id', async () => {
    const response = await api.get('/api/blogs')
    const blog = response.body[0]
  
    expect(blog.id).toBeDefined()
    expect(blog._id).toBeUndefined()
  })
  