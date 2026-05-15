const express = require('express')
const router = express.Router()
const { createUser, getUsers, loginUser } = require('../controllers/usersController')

router.post('/', createUser)
router.post('/login', loginUser)
router.get('/', getUsers)

module.exports = router
