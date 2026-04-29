// throw this on any route that needs the user to be logged in
const requireAuth = (req, res, next) => {
  if (!req.session.userId) {
    return res.status(401).json({ error: 'you need to be logged in' })
  }
  next()
}

module.exports = requireAuth
