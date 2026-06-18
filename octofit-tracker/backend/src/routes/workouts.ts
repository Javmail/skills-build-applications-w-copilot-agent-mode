import { Router } from 'express'
import Workout from '../models/workout'

const router = Router()

router.get('/', async (req, res) => {
  try {
    const workouts = await Workout.find().populate('user')
    res.json({ message: 'Workouts endpoint', data: workouts })
  } catch (error) {
    res.status(500).json({ message: 'Failed to load workouts', error })
  }
})

router.post('/', async (req, res) => {
  try {
    const workout = await Workout.create(req.body)
    res.status(201).json({ message: 'Create workout endpoint', workout })
  } catch (error) {
    res.status(500).json({ message: 'Failed to create workout', error })
  }
})

export default router
