import { body, validationResult } from 'express-validator'
import Enquiry from '../models/Enquiry.js'

// ── Validation rules ────────────────────────────────────────────────────────
export const validateEnquiry = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ max: 100 }).withMessage('Name too long'),
  body('phone')
    .trim()
    .notEmpty().withMessage('Phone number is required')
    .isLength({ max: 20 }).withMessage('Phone number too long'),
  body('email')
    .optional({ checkFalsy: true })
    .isEmail().withMessage('Invalid email address')
    .normalizeEmail(),
  body('productInterest')
    .optional()
    .trim()
    .isLength({ max: 200 }).withMessage('Product interest too long'),
  body('message')
    .optional()
    .trim()
    .isLength({ max: 2000 }).withMessage('Message too long'),
]

// POST /api/enquiries
export async function createEnquiry(req, res, next) {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg })
    }

    const { name, phone, email, productInterest, message, source } = req.body
    const enquiry = await Enquiry.create({
      name, phone,
      email:           email           || '',
      productInterest: productInterest || '',
      message:         message         || '',
      source:          ['contact-page', 'product-detail', 'website'].includes(source)
                         ? source : 'website',
    })

    res.status(201).json({ message: 'Enquiry submitted successfully', id: enquiry._id })
  } catch (err) {
    next(err)
  }
}
