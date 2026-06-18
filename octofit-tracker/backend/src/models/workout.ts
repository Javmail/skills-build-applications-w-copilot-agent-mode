import mongoose, { Schema, model, Document, Types } from 'mongoose'

export interface IWorkout extends Document {
  user: Types.ObjectId
  title: string
  description: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  durationMinutes: number
  scheduledFor: Date
  completed: boolean
}

const workoutSchema = new Schema<IWorkout>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  difficulty: { type: String, required: true, enum: ['Beginner', 'Intermediate', 'Advanced'] },
  durationMinutes: { type: Number, required: true },
  scheduledFor: { type: Date, required: true },
  completed: { type: Boolean, default: false }
})

const Workout = model<IWorkout>('Workout', workoutSchema)
export default Workout
