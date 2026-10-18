import mongoose from 'mongoose'

const enquirySchema = new mongoose.Schema(
  {
    name: {
      type:     String,
      required: [true, 'Name is required'],
      trim:     true,
      maxlength: [100, 'Name too long'],
    },
    phone: {
      type:     String,
      required: [true, 'Phone number is required'],
      trim:     true,
      maxlength: [20, 'Phone number too long'],
    },
    email: {
      type:    String,
      trim:    true,
      lowercase: true,
      default: '',
      match:   [/^$|^\S+@\S+\.\S+$/, 'Invalid email address'],
    },
    productInterest: {
      type:    String,
      trim:    true,
      default: '',
      maxlength: [200, 'Product interest too long'],
    },
    message: {
      type:    String,
      trim:    true,
      default: '',
      maxlength: [2000, 'Message too long'],
    },
    source: {
      type:    String,
      default: 'website',
      enum:    ['contact-page', 'product-detail', 'website'],
    },
    status: {
      type:    String,
      default: 'new',
      enum:    ['new', 'inProgress', 'resolved', 'closed'],
    },
    notes: {
      type:    String,
      default: '',
      maxlength: [1000, 'Notes too long'],
    },
  },
  { timestamps: true }
)

export default mongoose.model('Enquiry', enquirySchema)
