const jwt = require('jsonwebtoken')
const User = require('../models/user') // ✅ import your User model

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token = authorization.substring(7)
  } else {
    request.token = null
  }
  next()
}

const userExtractor = async (request, response, next) => {
  if (request.token) {
    try {
      const decodedToken = jwt.verify(request.token, process.env.SECRET)
      if (!decodedToken.id) {
        return response.status(401).json({ error: 'token invalid' })
      }

      const user = await User.findById(decodedToken.id)
      if (!user) {
        return response.status(401).json({ error: 'user not found' })
      }

      request.user = user // ✅ full user object
    } catch (error) {
      return response.status(401).json({ error: 'token invalid' })
    }
  } else {
    return response.status(401).json({ error: 'token missing' })
  }

  next()
}

module.exports = {
  tokenExtractor,
  userExtractor,
}
