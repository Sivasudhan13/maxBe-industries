import 'dotenv/config'
import express       from 'express'
import cors          from 'cors'
import helmet        from 'helmet'
import morgan        from 'morgan'
import rateLimit     from 'express-rate-limit'
import { connectDB } from './config/db.js'
import enquiryRoutes from './routes/enquiryRoutes.js'
import adminRoutes   from './routes/adminRoutes.js'
import { errorHandler } from './middleware/errorHandler.js'

const app  = express()
const PORT = process.env.PORT || 5000

// ── Security headers ─────────────────────────────────────────────────────────
app.use(helmet())

// ── CORS ─────────────────────────────────────────────────────────────────────
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}))

// ── Body parsing ─────────────────────────────────────────────────────────────
app.use(express.json({ limit: '2mb' }))
app.use(express.urlencoded({ extended: false }))

// ── HTTP logging (dev only) ───────────────────────────────────────────────────
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'))
}

// ── Rate limiting ─────────────────────────────────────────────────────────────
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,  // 15 minutes
  max:      100,
  standardHeaders: true,
  legacyHeaders:   false,
  message: { message: 'Too many requests, please try again later.' },
})

const enquiryLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,  // 1 hour
  max:      10,               // max 10 form submissions per IP per hour
  message: { message: 'Too many enquiries from this IP. Please try again later.' },
})

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max:      10,
  message: { message: 'Too many login attempts. Please wait 15 minutes.' },
})

app.use('/api', apiLimiter)
app.post('/api/enquiries', enquiryLimiter)
app.post('/api/admin/login', loginLimiter)

// ── Routes ───────────────────────────────────────────────────────────────────
app.use('/api/enquiries', enquiryRoutes)
app.use('/api/admin',     adminRoutes)

// ── Health check ─────────────────────────────────────────────────────────────
app.get('/api/health', (_req, res) => res.json({ status: 'ok', time: new Date().toISOString() }))

// ── 404 ──────────────────────────────────────────────────────────────────────
app.use((_req, res) => res.status(404).json({ message: 'Route not found' }))

// ── Global error handler ─────────────────────────────────────────────────────
app.use(errorHandler)

// ── Start ─────────────────────────────────────────────────────────────────────
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀  API server running on http://localhost:${PORT}`)
    console.log(`   Environment: ${process.env.NODE_ENV || 'development'}`)
  })
})
