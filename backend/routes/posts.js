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
    // case-insensitive partial match on pet name
    query.petName = { $regex: search, $options: 'i' }
  }

  try {
    let posts = await Post.find(query)
      .populate('author', 'username profilePic')
      .populate('comments.author', 'username')

    // sort in JS so we can use the avgRating virtual field
    if (sort === 'popular') {
      posts.sort((a, b) => b.ratings.length - a.ratings.length)
    } else if (sort === 'unpopular') {
      posts.sort((a, b) => a.ratings.length - b.ratings.length)
    } else if (sort === 'top-rated') {
      // highest avg rating first
      posts.sort((a, b) => b.avgRating - a.avgRating)
    } else {
      // default: most recent
      posts.sort((a, b) => b.createdAt - a.createdAt)
    }

    res.json(posts)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'could not fetch posts' })
  }
})

// GET /api/posts/:id — single post (used for the popup)
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('author', 'username profilePic')
      .populate('comments.author', 'username profilePic')

    if (!post) return res.status(404).json({ error: 'post not found' })
    res.json(post)
  } catch (err) {
    res.status(500).json({ error: 'could not fetch post' })
  }
})

// POST /api/posts — create a new post
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

// DELETE /api/posts/:id — only the author can delete
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

// POST /api/posts/:id/rate — rate 1-5, prevents duplicate ratings
router.post('/:id/rate', requireAuth, async (req, res) => {
  const { value } = req.body

  if (!value || value < 1 || value > 5) {
    return res.status(400).json({ error: 'rating must be between 1 and 5' })
  }

  try {
    const post = await Post.findById(req.params.id)
    if (!post) return res.status(404).json({ error: 'post not found' })

    // if user already rated, update; otherwise add new rating
    const existing = post.ratings.find(r => r.user.toString() === req.session.userId.toString())
    if (existing) {
      existing.value = value
    } else {
      post.ratings.push({ user: req.session.userId, value })
    }

    await post.save()
    res.json({
      avgRating: post.avgRating,
      ratingCount: post.ratings.length
    })
  } catch (err) {
    console.error(err)
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
    await post.populate('comments.author', 'username profilePic')

    // return just the new comment so the frontend can append it
    const newComment = post.comments[post.comments.length - 1]
    res.status(201).json(newComment)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'could not add comment' })
  }
})

module.exports = router
