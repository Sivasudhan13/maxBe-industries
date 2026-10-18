import mongoose from 'mongoose'

const adminSchema = new mongoose.Schema(
  {
    username: {
      type:     String,
      required: true,
      unique:   true,
      trim:     true,
      lowercase: true,
    },
    password: {
      type:     String,
      required: true,
      select:   false,   // never returned by default in queries
    },
  },
  { timestamps: true }
)

export default mongoose.model('Admin', adminSchema)
