const express = require('express')
const router = express.Router()
const Post = require('../models/Post')
const requireAuth = require('../middleware/requireAuth')

// GET /api/posts
// supports ?sort=recent|popular|unpopular and ?search=petname
router.get('/', async (req, res) => {
  const { sort, search } = req.query

  let query = {}
  if (search) {
    query.petName = { $regex: search, $options: 'i' }
  }

  let sortOption = { createdAt: -1 } // default: most recent
  if (sort === 'popular') sortOption = { 'ratings.length': -1 }
  if (sort === 'unpopular') sortOption = { 'ratings.length': 1 }

  try {
    const posts = await Post.find(query)
      .sort(sortOption)
      .populate('author', 'username profilePic')
      .populate('comments.author', 'username')

    res.json(posts)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'could not fetch posts' })
  }
})

// POST /api/posts, create a new post
router.post('/', requireAuth, async (req, res) => {
  const { imageUrl, caption, petName } = req.body

  if (!imageUrl || !petName) {
    return res.status(400).json({ error: 'image and pet name are required' })
  }

  try {
    const post = await Post.create({
      author: req.session.userId,
      imageUrl,
      caption,
      petName
    })

    await post.populate('author', 'username profilePic')
    res.status(201).json(post)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'could not create post' })
  }
})

// DELETE /api/posts/:id, only the post owner can delete
router.delete('/:id', requireAuth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    if (!post) return res.status(404).json({ error: 'post not found' })

    if (post.author.toString() !== req.session.userId.toString()) {
      return res.status(403).json({ error: "you can't delete someone else's post" })
    }

    await post.deleteOne()
    res.json({ message: 'post deleted' })
  } catch (err) {
    res.status(500).json({ error: 'could not delete post' })
  }
})

// POST /api/posts/:id/rate
router.post('/:id/rate', requireAuth, async (req, res) => {
  const { value } = req.body

  if (!value || value < 1 || value > 5) {
    return res.status(400).json({ error: 'rating must be between 1 and 5' })
  }

  try {
    const post = await Post.findById(req.params.id)
    if (!post) return res.status(404).json({ error: 'post not found' })

    // check if user already rated this post, update if so
    const existing = post.ratings.find(r => r.user.toString() === req.session.userId.toString())
    if (existing) {
      existing.value = value
    } else {
      post.ratings.push({ user: req.session.userId, value })
    }

    await post.save()
    res.json({ avgRating: post.avgRating, totalRatings: post.ratings.length })
  } catch (err) {
    res.status(500).json({ error: 'could not submit rating' })
  }
})

// POST /api/posts/:id/comments
router.post('/:id/comments', requireAuth, async (req, res) => {
  const { text } = req.body

  if (!text || text.trim() === '') {
    return res.status(400).json({ error: 'comment cannot be empty' })
  }

  try {
    const post = await Post.findById(req.params.id)
    if (!post) return res.status(404).json({ error: 'post not found' })

    post.comments.push({ author: req.session.userId, text: text.trim() })
    await post.save()
    await post.populate('comments.author', 'username')

    // return just the new comment
    const newComment = post.comments[post.comments.length - 1]
    res.status(201).json(newComment)
  } catch (err) {
    res.status(500).json({ error: 'could not add comment' })
  }
})

module.exports = router
