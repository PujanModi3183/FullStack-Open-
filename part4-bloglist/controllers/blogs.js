const express = require('express')
const Blog = require('../models/blog')
const blogsRouter = express.Router()
const User = require('../models/user')
const middleware = require('../utils/middleware')
const jwt = require('jsonwebtoken')
// GET all blogs
blogsRouter.get('/', async (req, res) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    res.json(blogs)
  })
  

// POST a new blog
blogsRouter.post('/', async (req, res) => {
  try {
    console.log('🔑 Token user:', req.user) // Debug

    if (!req.user) {
      return res.status(401).json({ error: 'token missing or invalid' })
    }

    const user = await User.findById(req.user.id)
    console.log('👤 Fetched user from DB:', user)

    const blog = new Blog({
      title: req.body.title,
      author: req.body.author,
      url: req.body.url,
      likes: req.body.likes || 0,
      user: user._id,
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    res.status(201).json(savedBlog)
  } catch (error) {
    console.error('❌ Error in blog POST:', error)
    res.status(500).json({ error: 'internal server error' })
  }
})


// DELETE blog by ID

// DELETE blog by ID (only if the user owns it)
blogsRouter.delete('/:id', async (req, res) => {
  const blog = await Blog.findById(req.params.id)

  if (!blog) {
    return res.status(404).json({ error: 'blog not found' })
  }

  if (blog.user.toString() !== req.user.id.toString()) {
    return res.status(403).json({ error: 'unauthorized: not blog owner' })
  }

  await Blog.findByIdAndDelete(req.params.id)
  res.status(204).end()
})

  
  blogsRouter.put('/:id', async (req, res) => {
    const { id } = req.params
    const { likes } = req.body
  
    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      { likes },
      { new: true, runValidators: true, context: 'query' }
    )
  
    if (!updatedBlog) {
      return res.status(404).json({ error: 'Blog not found' })
    }
  
    res.status(200).json(updatedBlog)
  })
  
module.exports = blogsRouter
