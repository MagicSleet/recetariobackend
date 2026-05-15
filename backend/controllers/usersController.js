const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

const createUser = asyncHandler(async (req, res) => {
  const { name, password, email } = req.body
  if (!name || !password) {
    res.status(400)
    throw new Error('Name and password required')
  }

  const exists = await User.findOne({ name: { $regex: `^${name}$`, $options: 'i' } })
  if (exists) {
    res.status(400)
    throw new Error('User already exists')
  }

  const payload = { name, password, isAdmin: false }
  if (email) payload.email = email
  else payload.email = `__noemail__${Date.now()}_${Math.random().toString(36).slice(2)}@no.email`

  try {
    const user = await User.create(payload)
    res.status(201).json({ _id: user._id, name: user.name })
  } catch (err) {
    if (err && err.code === 11000) {
      res.status(400)
      throw new Error('Duplicate field error: ' + JSON.stringify(err.keyValue))
    }
    throw err
  }
})

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select('-__v -password')
  res.json(users)
})

const loginUser = asyncHandler(async (req, res) => {
  const { name, password } = req.body
  if (!name || !password) {
    res.status(400)
    throw new Error('Name and password required')
  }

  const user = await User.findOne({ name: { $regex: `^${name}$`, $options: 'i' } })
  if (!user || String(user.password) !== String(password)) {
    res.status(401)
    throw new Error('Invalid credentials')
  }

  res.json({ _id: user._id, name: user.name })
})

module.exports = { createUser, getUsers, loginUser }
