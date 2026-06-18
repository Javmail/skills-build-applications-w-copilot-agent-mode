import express from 'express'
import mongoose from 'mongoose'
import usersRouter from './routes/users'
import teamsRouter from './routes/teams'
import activitiesRouter from './routes/activities'
import leaderboardRouter from './routes/leaderboard'
import workoutsRouter from './routes/workouts'

const app = express()
const PORT = 8000
const HOST = process.env.CODESPACE_NAME ? '0.0.0.0' : 'localhost'
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/octofit_db'
const API_URL = process.env.CODESPACE_NAME
  ? `https://${process.env.CODESPACE_NAME}-8000.app.github.dev`
  : `http://${HOST}:${PORT}`

app.use(express.json())
app.use('/api/users', usersRouter)
app.use('/api/teams', teamsRouter)
app.use('/api/activities', activitiesRouter)
app.use('/api/leaderboard', leaderboardRouter)
app.use('/api/workouts', workoutsRouter)

app.get('/', (req, res) => {
  res.json({ message: 'OctoFit Tracker API is running', apiUrl: API_URL })
})

app.listen(PORT, HOST, async () => {
  try {
    await mongoose.connect(MONGO_URI)
    console.log(`MongoDB connected at ${MONGO_URI}`)
  } catch (error) {
    console.error('MongoDB connection error:', error)
  }
  console.log(`Backend running on ${API_URL}`)
})
