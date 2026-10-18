import jwt from 'jsonwebtoken'
import Admin from '../models/Admin.js'

export async function requireAdmin(req, res, next) {
  try {
    const header = req.headers.authorization
    if (!header?.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Unauthorised — no token' })
    }

    const token   = header.split(' ')[1]
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    const admin = await Admin.findById(decoded.id)
    if (!admin) return res.status(401).json({ message: 'Unauthorised — admin not found' })

    req.admin = admin
    next()
  } catch (err) {
    const message = err.name === 'TokenExpiredError'
      ? 'Session expired — please sign in again'
      : 'Unauthorised — invalid token'
    return res.status(401).json({ message })
  }
}
