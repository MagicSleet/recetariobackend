const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  key: { type: String },
  isAdmin: { type: Boolean, default: false }
}, { timestamps: true })

module.exports = mongoose.model('User', userSchema)
