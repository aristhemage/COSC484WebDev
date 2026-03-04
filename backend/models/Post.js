const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  text: {
    type: String,
    required: true,
    maxlength: 500
  }
}, { timestamps: true })

const postSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  caption: {
    type: String,
    default: '',
    maxlength: 300
  },
  petName: {
    type: String,
    required: true
  },
  comments: [commentSchema],

  // ratings: store each user's rating so we can prevent duplicates
  // and calculate average rating on the fly without needing to update it every time
  ratings: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      value: { type: Number, min: 1, max: 5 }
    }
  ]
}, { timestamps: true })

// virtual field, calculates average rating without storing it
postSchema.virtual('avgRating').get(function () {
  if (this.ratings.length === 0) return 0
  const total = this.ratings.reduce((sum, r) => sum + r.value, 0)
  return (total / this.ratings.length).toFixed(1)
})

postSchema.set('toJSON', { virtuals: true })

module.exports = mongoose.model('Post', postSchema)
