const express = require('express')
const router = express.Router()
const User = require('../models/User')

// POST /api/auth/register
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body

  if (!username || !email || !password) {
    return res.status(400).json({ error: 'all fields are required' })
  }

  try {
    const existingUser = await User.findOne({ $or: [{ email }, { username }] })
    if (existingUser) {
      return res.status(400).json({ error: 'username or email already taken' })
    }

    const user = await User.create({ username, email, password })

    // log them in right after registering
    req.session.userId = user._id

    res.status(201).json({
      message: 'account created',
      user: { id: user._id, username: user.username, email: user.email }
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'something went wrong' })
  }
})

// POST /api/auth/login — accepts either username or email as "identifier"
router.post('/login', async (req, res) => {
  const { identifier, password } = req.body

  if (!identifier || !password) {
    return res.status(400).json({ error: 'username/email and password required' })
  }

  try {
    const user = await User.findOne({
      $or: [
        { email: identifier },
        { username: identifier }
      ]
    })
    if (!user) {
      return res.status(401).json({ error: 'invalid credentials' })
    }

    const match = await user.comparePassword(password)
    if (!match) {
      return res.status(401).json({ error: 'invalid credentials' })
    }

    req.session.userId = user._id

    res.json({
      message: 'logged in',
      user: { id: user._id, username: user.username, email: user.email }
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'something went wrong' })
  }
})

// POST /api/auth/logout
router.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) return res.status(500).json({ error: 'logout failed' })
    res.clearCookie('connect.sid')
    res.json({ message: 'logged out' })
  })
})

// GET /api/auth/me — react uses this on app load to check if user still has a session
router.get('/me', async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ error: 'not logged in' })
  }
  try {
    const user = await User.findById(req.session.userId).select('-password')
    res.json(user)
  } catch (err) {
    res.status(500).json({ error: 'something went wrong' })
  }
})

module.exports = router
