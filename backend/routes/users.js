const express = require('express')
const router = express.Router()
const User = require('../models/User')
const Post = require('../models/Post')
const requireAuth = require('../middleware/requireAuth')

// GET /api/users?search=name — search profiles by username
// returns up to 20 matches
router.get('/', async (req, res) => {
  const { search } = req.query

  try {
    const query = search
      ? { username: { $regex: search, $options: 'i' } }
      : {}

    const users = await User.find(query)
      .select('username profilePic bio')
      .limit(20)

    res.json(users)
  } catch (err) {
    res.status(500).json({ error: 'could not search users' })
  }
})

// GET /api/users/:username — public profile page (user info + their posts)
router.get('/:username', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username }).select('-password')
    if (!user) return res.status(404).json({ error: 'user not found' })

    // grab all their posts too, newest first
    const posts = await Post.find({ author: user._id })
      .sort({ createdAt: -1 })
      .populate('author', 'username profilePic')

    res.json({ user, posts })
  } catch (err) {
    res.status(500).json({ error: 'could not load profile' })
  }
})

// PATCH /api/users/profile — update your own profile
router.patch('/profile', requireAuth, async (req, res) => {
  const { bio, profilePic } = req.body

  try {
    const user = await User.findByIdAndUpdate(
      req.session.userId,
      { bio, profilePic },
      { new: true }
    ).select('-password')

    res.json(user)
  } catch (err) {
    res.status(500).json({ error: 'could not update profile' })
  }
})

module.exports = router
