const dummy = (blogs) => {
    return 1
  }
  
  const totalLikes = (blogs) => {
    return blogs.reduce((sum, blog) => sum + blog.likes, 0)
  }
  
  const favoriteBlog = (blogs) => {
    if (blogs.length === 0) return null
  
    return blogs.reduce((max, blog) => {
      return blog.likes > max.likes ? blog : max
    })
  }

  const mostBlogs = (blogs) => {
    if (blogs.length === 0) return null
  
    const authorCounts = {}
  
    blogs.forEach((blog) => {
      authorCounts[blog.author] = (authorCounts[blog.author] || 0) + 1
    })
  
    let topAuthor = null
    let maxBlogs = 0
  
    for (const author in authorCounts) {
      if (authorCounts[author] > maxBlogs) {
        maxBlogs = authorCounts[author]
        topAuthor = author
      }
    }
  
    return {
      author: topAuthor,
      blogs: maxBlogs
    }
  }
  
  const mostLikes = (blogs) => {
    if (blogs.length === 0) return null
  
    const likeCount = {}
  
    blogs.forEach(blog => {
      likeCount[blog.author] = (likeCount[blog.author] || 0) + blog.likes
    })
  
    let topAuthor = null
    let maxLikes = 0
  
    for (const author in likeCount) {
      if (likeCount[author] > maxLikes) {
        maxLikes = likeCount[author]
        topAuthor = author
      }
    }
  
    return {
      author: topAuthor,
      likes: maxLikes
    }
  }
  
  // ✅ Make sure exports come AFTER all function definitions
  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
  }

  
  
  