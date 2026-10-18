import { Router } from 'express'
import { requireAdmin } from '../middleware/auth.js'
import {
  login,
  getMe,
  changePassword,
  getStats,
  getAdminProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getAdminEnquiries,
  updateEnquiryStatus,
  deleteEnquiry,
} from '../controllers/adminController.js'

const router = Router()

// ── Public admin routes ──────────────────────────────────────────────────────
router.post('/login', login)

// ── Protected admin routes ───────────────────────────────────────────────────
router.use(requireAdmin)

router.get('/me',                            getMe)
router.post('/change-password',              changePassword)
router.get('/stats',                         getStats)

// Products
router.get('/products',                      getAdminProducts)
router.post('/products',                     createProduct)
router.put('/products/:id',                  updateProduct)
router.delete('/products/:id',               deleteProduct)

// Enquiries
router.get('/enquiries',                     getAdminEnquiries)
router.patch('/enquiries/:id',               updateEnquiryStatus)
router.delete('/enquiries/:id',              deleteEnquiry)

export default router
