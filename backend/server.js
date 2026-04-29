const express = require('express')
const mongoose = require('mongoose')
const session = require('express-session')
const cors = require('cors')
const path = require('path')
require('dotenv').config()

const authRoutes = require('./routes/auth')
const postRoutes = require('./routes/posts')
const userRoutes = require('./routes/users')
const uploadRoutes = require('./routes/upload')

const app = express()

// middleware
app.use(express.json())
app.use(cors({
  origin: 'http://localhost:3000', // react dev server
  credentials: true
}))
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, // flip to true when deployed on https
    maxAge: 1000 * 60 * 60 * 24 // 24 hours
  }
}))

// serve uploaded images statically at /uploads/<filename>
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

// connect to mongo
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('mongodb connected'))
  .catch(err => console.log('db connection error:', err))

// routes
app.use('/api/auth', authRoutes)
app.use('/api/posts', postRoutes)
app.use('/api/users', userRoutes)
app.use('/api/upload', uploadRoutes)

// health check
app.get('/', (req, res) => {
  res.json({ message: 'petstagram api is running' })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`server running on port ${PORT}`))
