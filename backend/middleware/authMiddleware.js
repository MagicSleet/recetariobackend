const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

const requireAdmin = asyncHandler(async (req, res, next) => {
  const key = req.header('x-user-key') || req.query['x-user-key'] || (req.body && (req.body['x-user-key'] || req.body.key))
  if (String(key) === '1') {
    next()
  } else {
    res.status(401)
    throw new Error('Admin access required')
  }
})

const attachUser = asyncHandler(async (req, res, next) => {
  const id = req.header('x-user-id') || req.query['x-user-id'] || (req.body && (req.body['x-user-id'] || req.body.userId))
  if (id) {
    const user = await User.findById(id)
    if (user) req.user = user
  }
  next()
})

module.exports = { requireAdmin, attachUser }
