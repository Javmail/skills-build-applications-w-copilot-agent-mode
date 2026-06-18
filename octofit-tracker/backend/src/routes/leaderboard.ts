import { Router } from 'express'
import Leaderboard from '../models/leaderboard'

const router = Router()

router.get('/', async (req, res) => {
  try {
    const leaderboard = await Leaderboard.find().populate('entityRef')
    res.json({ message: 'Leaderboard endpoint', data: leaderboard })
  } catch (error) {
    res.status(500).json({ message: 'Failed to load leaderboard', error })
  }
})

export default router
