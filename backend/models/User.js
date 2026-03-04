const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  bio: {
    type: String,
    default: ''
  },
  profilePic: {
    type: String,
    default: ''
  }
}, { timestamps: true })

// hash the password before saving - never store plain text
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()
  this.password = await bcrypt.hash(this.password, 10)
  next()
})

// helper method to check password on login
userSchema.methods.comparePassword = async function (plaintext) {
  return await bcrypt.compare(plaintext, this.password)
}

module.exports = mongoose.model('User', userSchema)
