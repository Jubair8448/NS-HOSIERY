import mongoose from 'mongoose'

const ScratchCodeSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    isUsed: {
      type: Boolean,
      default: false,
    },
    usedAt: {
      type: Date,
      default: null,
    },
    verificationCount: {
      type: Number,
      default: 0, // Keeps count of total times verified
    },
    lastVerifiedAt: {
      type: Date,
      default: null, // ✅ New field to show latest verification
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt
  }
)

export default mongoose.models.ScratchCode ||
  mongoose.model('ScratchCode', ScratchCodeSchema)
