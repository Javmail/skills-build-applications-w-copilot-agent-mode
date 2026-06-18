import mongoose from 'mongoose'

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/octofit_db'

export async function connectDatabase() {
  await mongoose.connect(MONGO_URI)
  console.log(`MongoDB connected at ${MONGO_URI}`)
}

export { MONGO_URI }
