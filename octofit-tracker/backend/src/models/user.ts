import mongoose, { Schema, model, Document, Types } from 'mongoose'

export interface IUser extends Document {
  name: string
  email: string
  role: 'member' | 'coach'
  team?: Types.ObjectId
  metrics: {
    totalDistanceKm: number
    totalHours: number
    totalWorkouts: number
  }
  createdAt: Date
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, required: true, enum: ['member', 'coach'], default: 'member' },
  team: { type: Schema.Types.ObjectId, ref: 'Team' },
  metrics: {
    totalDistanceKm: { type: Number, default: 0 },
    totalHours: { type: Number, default: 0 },
    totalWorkouts: { type: Number, default: 0 }
  },
  createdAt: { type: Date, default: () => new Date() }
})

const User = model<IUser>('User', userSchema)
export default User
