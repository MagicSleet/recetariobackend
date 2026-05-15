const express = require('express')
const router = express.Router()
const { seedRecipes, getRecipes, createRecipe } = require('../controllers/recipesController')

router.post('/seed', seedRecipes)
router.post('/', createRecipe)
router.get('/', getRecipes)

module.exports = router
