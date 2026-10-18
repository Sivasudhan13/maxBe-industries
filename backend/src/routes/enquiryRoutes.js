import { Router } from 'express'
import { createEnquiry, validateEnquiry } from '../controllers/enquiryController.js'

const router = Router()

// POST /api/enquiries
router.post('/', validateEnquiry, createEnquiry)

export default router
