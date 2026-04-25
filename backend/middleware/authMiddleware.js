const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

// Check admin by x-user-key header === '1'
const requireAdmin = asyncHandler(async (req, res, next) => {
  const key = req.header('x-user-key')
  if (String(key) === '1') {
    next()
  } else {
    res.status(401)
    throw new Error('Admin access required')
  }
})

// Optional middleware to attach user from x-user-id header
const attachUser = asyncHandler(async (req, res, next) => {
  const id = req.header('x-user-id')
  if (id) {
    const user = await User.findById(id)
    if (user) req.user = user
  }
  next()
})

module.exports = { requireAdmin, attachUser }
