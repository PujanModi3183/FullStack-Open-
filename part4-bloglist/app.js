const express = require('express')
const mongoose = require('mongoose')
const Blog = require('./models/blog')

const app = express()
app.use(express.json())

const mongoUrl = 'mongodb+srv://pujanmodi96:modipujan@cluster0.8qm8h.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
mongoose.connect(mongoUrl)

app.get('/api/blogs', async (req, res) => {
  const blogs = await Blog.find({})
  res.json(blogs)
})

app.post('/api/blogs', async (req, res) => {
  const blog = new Blog(req.body)
  const savedBlog = await blog.save()
  res.status(201).json(savedBlog)
})

module.exports = app
