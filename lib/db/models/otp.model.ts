import { Schema, model, models } from 'mongoose'

const otpSchema = new Schema(
  {
    phone: { type: String, required: true },
    otp: { type: String, required: true },
    expiresAt: { type: Date, required: true },
  },
  { timestamps: true }
)

export default models.Otp || model('Otp', otpSchema)
