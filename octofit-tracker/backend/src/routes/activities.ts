import { Router } from 'express'
import Activity from '../models/activity'

const router = Router()

router.get('/', async (req, res) => {
  try {
    const activities = await Activity.find().populate('user team')
    res.json({ message: 'Activities endpoint', data: activities })
  } catch (error) {
    res.status(500).json({ message: 'Failed to load activities', error })
  }
})

router.post('/', async (req, res) => {
  try {
    const activity = await Activity.create(req.body)
    res.status(201).json({ message: 'Log activity endpoint', activity })
  } catch (error) {
    res.status(500).json({ message: 'Failed to log activity', error })
  }
})

export default router
