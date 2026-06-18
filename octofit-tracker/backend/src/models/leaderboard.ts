import mongoose, { Schema, model, Document, Types } from 'mongoose'

export interface ILeaderboardEntry extends Document {
  entityRef: Types.ObjectId
  entityType: 'User' | 'Team'
  rank: number
  score: number
  category: string
  updatedAt: Date
}

const leaderboardSchema = new Schema<ILeaderboardEntry>({
  entityRef: { type: Schema.Types.ObjectId, required: true, refPath: 'entityType' },
  entityType: { type: String, required: true, enum: ['User', 'Team'] },
  rank: { type: Number, required: true },
  score: { type: Number, required: true },
  category: { type: String, required: true },
  updatedAt: { type: Date, default: () => new Date() }
})

const Leaderboard = model<ILeaderboardEntry>('Leaderboard', leaderboardSchema)
export default Leaderboard
