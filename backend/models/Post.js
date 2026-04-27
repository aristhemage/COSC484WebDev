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

  // store each user's rating so we can prevent duplicates
  // and calculate the average on the fly
  ratings: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      value: { type: Number, min: 1, max: 5 }
    }
  ]
}, { timestamps: true })

// virtual field: average rating, calculated on read (not stored)
postSchema.virtual('avgRating').get(function () {
  if (this.ratings.length === 0) return 0
  const total = this.ratings.reduce((sum, r) => sum + r.value, 0)
  return Number((total / this.ratings.length).toFixed(1))
})

// virtual field: total ratings count, easier for frontend than ratings.length
postSchema.virtual('ratingCount').get(function () {
  return this.ratings.length
})

postSchema.set('toJSON', { virtuals: true })

module.exports = mongoose.model('Post', postSchema)
