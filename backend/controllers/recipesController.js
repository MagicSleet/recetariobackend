const asyncHandler = require('express-async-handler')
const Recipe = require('../models/recipeModel')

const seedRecipes = asyncHandler(async (req, res) => {
  const sample = [
    { title: 'Tacos de papa', description: 'Ricos tacos con papa', ingredients: ['papas','tortilla','aceite'], instructions: 'Freir y montar' },
    { title: 'Ensalada fresca', description: 'Ensalada para acompañar', ingredients: ['lechuga','tomate','aceite'], instructions: 'Mezclar todo' },
    { title: 'Sopa instant', description: 'Sopa rapida', ingredients: ['agua','sazonador'], instructions: 'Hervir' }
  ]
  await Recipe.deleteMany({})
  const created = await Recipe.insertMany(sample)
  res.status(201).json(created)
})

const getRecipes = asyncHandler(async (req, res) => {
  const recipes = await Recipe.find()
  res.json(recipes)
})

module.exports = { seedRecipes, getRecipes }
