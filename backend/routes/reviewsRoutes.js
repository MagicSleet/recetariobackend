const express = require('express')
const router = express.Router()
const { createReview, getReviews, getReviewsByRecipe, deleteReview } = require('../controllers/reviewsController')
const { requireAdmin, attachUser } = require('../middleware/authMiddleware')

router.use(attachUser)
router.post('/', createReview)
router.get('/', getReviews)
router.get('/recipe/:id', getReviewsByRecipe)
router.delete('/:id', requireAdmin, deleteReview)

module.exports = router
