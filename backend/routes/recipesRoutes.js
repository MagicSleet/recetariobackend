const express = require('express')
const router = express.Router()
const { seedRecipes, getRecipes } = require('../controllers/recipesController')

router.post('/seed', seedRecipes)
router.get('/', getRecipes)

module.exports = router
