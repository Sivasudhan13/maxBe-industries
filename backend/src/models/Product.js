import mongoose from 'mongoose'

const productSchema = new mongoose.Schema(
  {
    name: {
      type:     String,
      required: [true, 'Product name is required'],
      trim:     true,
    },
    slug: {
      type:   String,
      unique: true,
      trim:   true,
      lowercase: true,
    },
    model: {
      type:     String,
      required: [true, 'Model number is required'],
      trim:     true,
    },
    category: {
      type:    String,
      required: true,
      enum:    ['monoblock', 'openwell', 'v4-submersible'],
    },
    shortDesc:   { type: String, trim: true, default: '' },
    description: { type: String, trim: true, default: '' },
    images:      { type: [String], default: [] },
    specs:       { type: mongoose.Schema.Types.Mixed, default: {} },
    features:    { type: [String], default: [] },
    applications:{ type: [String], default: [] },
    brochure:    { type: String, default: null },
    isActive:    { type: Boolean, default: true },
  },
  { timestamps: true }
)

// Auto-generate slug from name + model if not provided
productSchema.pre('save', function (next) {
  if (!this.slug) {
    this.slug = `${this.name}-${this.model}`
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
  }
  next()
})

export default mongoose.model('Product', productSchema)
