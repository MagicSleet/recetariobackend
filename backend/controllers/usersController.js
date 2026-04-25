const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

// @desc Create user
// @route POST /api/users
const createUser = asyncHandler(async (req, res) => {
  const { name, email, key } = req.body
  if (!name || !email) {
    res.status(400)
    throw new Error('Name and email required')
  }

  const exists = await User.findOne({ email })
  if (exists) {
    res.status(400)
    throw new Error('User already exists')
  }

  const isAdmin = String(key) === '1'
  const user = await User.create({ name, email, key, isAdmin })
  res.status(201).json(user)
})

// @desc Get users
// @route GET /api/users
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select('-__v')
  res.json(users)
})

module.exports = { createUser, getUsers }
