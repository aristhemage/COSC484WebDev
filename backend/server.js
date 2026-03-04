const express = require('express')
const mongoose = require('mongoose')
const session = require('express-session')
const cors = require('cors')
require('dotenv').config()

const authRoutes = require('./routes/auth')
const postRoutes = require('./routes/posts')
const userRoutes = require('./routes/users')

const app = express()

// middleware
app.use(express.json())
app.use(cors({
  origin: 'http://localhost:3000', // your react app
  credentials: true
}))
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, // flip to true when you deploy w/ https
    maxAge: 1000 * 60 * 60 * 24 // 24 hours
  }
}))

// connect to mongo
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('mongodb connected'))
  .catch(err => console.log('db connection error:', err))

// routes
app.use('/api/auth', authRoutes)
app.use('/api/posts', postRoutes)
app.use('/api/users', userRoutes)

// health check
app.get('/', (req, res) => {
  res.json({ message: 'pawbase api is running' })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`server running on port ${PORT}`))
