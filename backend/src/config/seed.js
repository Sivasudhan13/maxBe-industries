/**
 * Seed script — creates the initial admin user.
 * Run once: npm run seed
 * Reads ADMIN_USERNAME and ADMIN_PASSWORD from .env
 */
import 'dotenv/config'
import bcrypt from 'bcryptjs'
import { connectDB } from './db.js'
import Admin from '../models/Admin.js'

await connectDB()

const username = process.env.ADMIN_USERNAME || 'admin'
const password = process.env.ADMIN_PASSWORD

if (!password || password === 'replace_with_strong_password') {
  console.error('❌  Set ADMIN_PASSWORD in your .env file before seeding.')
  process.exit(1)
}

const existing = await Admin.findOne({ username })
if (existing) {
  console.log(`ℹ️   Admin "${username}" already exists. Skipping.`)
  process.exit(0)
}

const hashed = await bcrypt.hash(password, 12)
await Admin.create({ username, password: hashed })
console.log(`✅  Admin user "${username}" created successfully.`)
process.exit(0)
