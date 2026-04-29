const express = require('express')
const router = express.Router()
const multer = require('multer')
const path = require('path')
const requireAuth = require('../middleware/requireAuth')

// store uploads in /uploads with a unique filename
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/')
  },
  filename: (req, file, cb) => {
    // userId-timestamp.extension, e.g. 65a4f-1717000000000.jpg
    // makes filenames unique and traceable
    const ext = path.extname(file.originalname)
    const safeName = `${req.session.userId}-${Date.now()}${ext}`
    cb(null, safeName)
  }
})

// only accept image files
const fileFilter = (req, file, cb) => {
  const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
  if (allowed.includes(file.mimetype)) {
    cb(null, true)
  } else {
    cb(new Error('only jpg, png, webp, and gif images are allowed'), false)
  }
}

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 5mb max
})

// POST /api/upload — accepts a single image, returns the URL to use in a post
// react form should send FormData with field name "image"
router.post('/', requireAuth, upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'no file uploaded' })
  }

  // return a URL that can be used in <img src="..." />
  // since we serve /uploads statically in server.js, this works
  const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`

  res.json({
    message: 'upload successful',
    imageUrl,
    filename: req.file.filename
  })
})

// multer error handler — friendly messages instead of stack traces
router.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: 'image must be under 5mb' })
    }
    return res.status(400).json({ error: err.message })
  }
  if (err) {
    return res.status(400).json({ error: err.message })
  }
  next()
})

module.exports = router
