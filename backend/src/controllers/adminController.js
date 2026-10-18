import bcrypt   from 'bcryptjs'
import jwt       from 'jsonwebtoken'
import Admin     from '../models/Admin.js'
import Product   from '../models/Product.js'
import Enquiry   from '../models/Enquiry.js'

// ── Auth ────────────────────────────────────────────────────────────────────

export async function login(req, res, next) {
  try {
    const { username, password } = req.body
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' })
    }

    // Explicitly select password (schema has select:false)
    const admin = await Admin.findOne({ username: username.toLowerCase().trim() }).select('+password')
    if (!admin) {
      // Constant-time compare even on not-found to prevent user enumeration
      await bcrypt.compare(password, '$2b$12$invalidhashpadding000000000000000000000000000000000000000')
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    const match = await bcrypt.compare(password, admin.password)
    if (!match) return res.status(401).json({ message: 'Invalid credentials' })

    const token = jwt.sign(
      { id: admin._id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    )

    res.json({
      token,
      admin: { id: admin._id, username: admin.username },
    })
  } catch (err) {
    next(err)
  }
}

export async function getMe(req, res) {
  res.json({ id: req.admin._id, username: req.admin.username })
}

export async function changePassword(req, res, next) {
  try {
    const { currentPassword, newPassword } = req.body
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: 'Both current and new passwords are required' })
    }
    if (newPassword.length < 8) {
      return res.status(400).json({ message: 'New password must be at least 8 characters' })
    }

    const admin = await Admin.findById(req.admin._id).select('+password')
    const match = await bcrypt.compare(currentPassword, admin.password)
    if (!match) return res.status(401).json({ message: 'Current password is incorrect' })

    admin.password = await bcrypt.hash(newPassword, 12)
    await admin.save()
    res.json({ message: 'Password changed successfully' })
  } catch (err) {
    next(err)
  }
}

// ── Dashboard stats ─────────────────────────────────────────────────────────

export async function getStats(req, res, next) {
  try {
    const [products, enquiries, newEnquiries, resolvedEnquiries] = await Promise.all([
      Product.countDocuments({ isActive: true }),
      Enquiry.countDocuments(),
      Enquiry.countDocuments({ status: 'new' }),
      Enquiry.countDocuments({ status: 'resolved' }),
    ])
    res.json({ products, enquiries, newEnquiries, resolvedEnquiries })
  } catch (err) {
    next(err)
  }
}

// ── Products (admin) ────────────────────────────────────────────────────────

export async function getAdminProducts(req, res, next) {
  try {
    const products = await Product.find().sort('-createdAt').lean()
    res.json({ products, total: products.length })
  } catch (err) {
    next(err)
  }
}

export async function createProduct(req, res, next) {
  try {
    const product = await Product.create(req.body)
    res.status(201).json({ message: 'Product created', product })
  } catch (err) {
    next(err)
  }
}

export async function updateProduct(req, res, next) {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    if (!product) return res.status(404).json({ message: 'Product not found' })
    res.json({ message: 'Product updated', product })
  } catch (err) {
    next(err)
  }
}

export async function deleteProduct(req, res, next) {
  try {
    const product = await Product.findByIdAndDelete(req.params.id)
    if (!product) return res.status(404).json({ message: 'Product not found' })
    res.json({ message: 'Product deleted' })
  } catch (err) {
    next(err)
  }
}

// ── Enquiries (admin) ────────────────────────────────────────────────────────

export async function getAdminEnquiries(req, res, next) {
  try {
    const { sort = '-createdAt', limit, status } = req.query
    const filter = status ? { status } : {}
    let query    = Enquiry.find(filter).sort(sort)
    if (limit) query = query.limit(parseInt(limit, 10))
    const enquiries = await query.lean()
    res.json({ enquiries, total: enquiries.length })
  } catch (err) {
    next(err)
  }
}

export async function updateEnquiryStatus(req, res, next) {
  try {
    const allowed = ['new', 'inProgress', 'resolved', 'closed']
    const { status, notes } = req.body
    if (status && !allowed.includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' })
    }
    const update = {}
    if (status) update.status = status
    if (notes  !== undefined) update.notes = notes

    const enquiry = await Enquiry.findByIdAndUpdate(req.params.id, update, { new: true })
    if (!enquiry) return res.status(404).json({ message: 'Enquiry not found' })
    res.json({ message: 'Enquiry updated', enquiry })
  } catch (err) {
    next(err)
  }
}

export async function deleteEnquiry(req, res, next) {
  try {
    const enquiry = await Enquiry.findByIdAndDelete(req.params.id)
    if (!enquiry) return res.status(404).json({ message: 'Enquiry not found' })
    res.json({ message: 'Enquiry deleted' })
  } catch (err) {
    next(err)
  }
}
