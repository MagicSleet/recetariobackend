const mongoose = require('mongoose')

const reviewSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  recipe: { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe', required: true },
  rating: { type: Number, required: true },
  comment: { type: String }
}, { timestamps: true })

module.exports = mongoose.model('Review', reviewSchema)
