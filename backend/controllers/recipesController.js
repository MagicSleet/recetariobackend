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

const createRecipe = asyncHandler(async (req, res) => {
  const { title, description, ingredients, instructions } = req.body
  if (!title) {
    res.status(400)
    throw new Error('Title required')
  }

  const exists = await Recipe.findOne({ title })
  if (exists) {
    return res.status(200).json(exists)
  }

  const recipe = await Recipe.create({ title, description, ingredients, instructions })
  res.status(201).json(recipe)
})

module.exports = { seedRecipes, getRecipes, createRecipe }
