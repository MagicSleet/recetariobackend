const asyncHandler = require('express-async-handler')
const Review = require('../models/reviewModel')
const Recipe = require('../models/recipeModel')

// @desc Create review
// @route POST /api/reviews
const createReview = asyncHandler(async (req, res) => {
  const { userId, recipeId, rating, comment } = req.body
  if (!userId || !recipeId || !rating) {
    res.status(400)
    throw new Error('userId, recipeId and rating are required')
  }

  const review = await Review.create({ user: userId, recipe: recipeId, rating, comment })

  // update recipe stats
  const reviews = await Review.find({ recipe: recipeId })
  const recipe = await Recipe.findById(recipeId)
  if (recipe) {
    recipe.numReviews = reviews.length
    recipe.rating = reviews.reduce((a, r) => a + r.rating, 0) / reviews.length
    await recipe.save()
  }

  res.status(201).json(review)
})

// @desc Get all reviews
// @route GET /api/reviews
const getReviews = asyncHandler(async (req, res) => {
  const reviews = await Review.find().populate('user', 'name email').populate('recipe', 'title')
  res.json(reviews)
})

// @desc Get reviews for a recipe
// @route GET /api/reviews/recipe/:id
const getReviewsByRecipe = asyncHandler(async (req, res) => {
  const recipeId = req.params.id
  const reviews = await Review.find({ recipe: recipeId }).populate('user', 'name email')
  res.json(reviews)
})

// @desc Delete review (admin only)
// @route DELETE /api/reviews/:id
const deleteReview = asyncHandler(async (req, res) => {
  const id = req.params.id
  const review = await Review.findById(id)
  if (!review) {
    res.status(404)
    throw new Error('Review not found')
  }
  await review.remove()

  // update recipe stats
  const reviews = await Review.find({ recipe: review.recipe })
  const recipe = await Recipe.findById(review.recipe)
  if (recipe) {
    recipe.numReviews = reviews.length
    recipe.rating = reviews.length ? reviews.reduce((a, r) => a + r.rating, 0) / reviews.length : 0
    await recipe.save()
  }

  res.json({ message: 'Review deleted' })
})

module.exports = { createReview, getReviews, getReviewsByRecipe, deleteReview }
