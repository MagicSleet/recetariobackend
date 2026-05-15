const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  name: { type: String, required: true, unique: true },
  email: { type: String },
  password: { type: String, required: true },
  key: { type: String },
  isAdmin: { type: Boolean, default: false }
}, { timestamps: true })

module.exports = mongoose.model('User', userSchema)
