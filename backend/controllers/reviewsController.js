const asyncHandler = require('express-async-handler')
const Review = require('../models/reviewModel')
const Recipe = require('../models/recipeModel')

const createReview = asyncHandler(async (req, res) => {
  const { userId, recipeId, rating, comment } = req.body
  if (!userId || !recipeId || !rating) {
    res.status(400)
    throw new Error('userId, recipeId and rating are required')
  }

  const review = await Review.create({ user: userId, recipe: recipeId, rating, comment })

  const reviews = await Review.find({ recipe: recipeId })
  const recipe = await Recipe.findById(recipeId)
  if (recipe) {
    recipe.numReviews = reviews.length
    recipe.rating = reviews.reduce((a, r) => a + r.rating, 0) / reviews.length
    await recipe.save()
  }

  res.status(201).json(review)
})

const getReviews = asyncHandler(async (req, res) => {
  const reviews = await Review.find().populate('user', 'name email').populate('recipe', 'title')
  res.json(reviews)
})

const getReviewsByRecipe = asyncHandler(async (req, res) => {
  const recipeId = req.params.id
  const reviews = await Review.find({ recipe: recipeId }).populate('user', 'name email')
  res.json(reviews)
})

const deleteReview = asyncHandler(async (req, res) => {
  const id = req.params.id
  const review = await Review.findById(id)
  if (!review) {
    res.status(404)
    throw new Error('Review not found')
  }

  const recipeId = review.recipe

  await Review.findByIdAndDelete(id)

  const reviews = await Review.find({ recipe: recipeId })
  const recipe = await Recipe.findById(recipeId)
  if (recipe) {
    recipe.numReviews = reviews.length
    recipe.rating = reviews.length ? reviews.reduce((a, r) => a + r.rating, 0) / reviews.length : 0
    await recipe.save()
  }

  res.json({ message: 'Review deleted' })
})

module.exports = { createReview, getReviews, getReviewsByRecipe, deleteReview }
