const express = require('express')
const mongoose = require('mongoose')

const app = express()
app.use(express.json())

const mongoUrl = 'mongodb+srv://pujanmodi96:modipujan@cluster0.8qm8h.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
mongoose.connect(mongoUrl)

// 🔧 Add transformation here
const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
})

// ✅ Rename _id ➝ id and remove __v when converting to JSON
blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Blog = mongoose.model('Blog', blogSchema)

app.get('/api/blogs', async (req, res) => {
  const blogs = await Blog.find({})
  res.json(blogs)
})

app.post('/api/blogs', async (req, res) => {
  const blog = new Blog(req.body)
  const savedBlog = await blog.save()
  res.status(201).json(savedBlog)
})

const PORT = 3003
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`)
})
