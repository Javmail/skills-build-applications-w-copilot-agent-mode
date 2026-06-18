import mongoose, { Schema, model, Document, Types } from 'mongoose'

export interface IActivity extends Document {
  user: Types.ObjectId
  team?: Types.ObjectId
  type: string
  durationMinutes: number
  distanceKm: number
  calories: number
  date: Date
  notes: string
}

const activitySchema = new Schema<IActivity>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  team: { type: Schema.Types.ObjectId, ref: 'Team' },
  type: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  distanceKm: { type: Number, required: true, default: 0 },
  calories: { type: Number, required: true },
  date: { type: Date, required: true },
  notes: { type: String, default: '' }
})

const Activity = model<IActivity>('Activity', activitySchema)
export default Activity
