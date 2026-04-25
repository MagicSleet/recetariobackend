const mongoose = require('mongoose')

const recipeSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  ingredients: [{ type: String }],
  instructions: { type: String },
  numReviews: { type: Number, default: 0 },
  rating: { type: Number, default: 0 }
}, { timestamps: true })

module.exports = mongoose.model('Recipe', recipeSchema)
