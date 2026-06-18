import { Router } from 'express'
import User from '../models/user'

const router = Router()

router.get('/', async (req, res) => {
  try {
    const users = await User.find().populate('team')
    res.json({ message: 'Users endpoint', data: users })
  } catch (error) {
    res.status(500).json({ message: 'Failed to load users', error })
  }
})

router.post('/', async (req, res) => {
  try {
    const user = await User.create(req.body)
    res.status(201).json({ message: 'Create user endpoint', user })
  } catch (error) {
    res.status(500).json({ message: 'Failed to create user', error })
  }
})

export default router
