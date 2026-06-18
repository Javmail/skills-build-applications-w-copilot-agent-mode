import { Router } from 'express'
import Team from '../models/team'

const router = Router()

router.get('/', async (req, res) => {
  try {
    const teams = await Team.find().populate('members')
    res.json({ message: 'Teams endpoint', data: teams })
  } catch (error) {
    res.status(500).json({ message: 'Failed to load teams', error })
  }
})

router.post('/', async (req, res) => {
  try {
    const team = await Team.create(req.body)
    res.status(201).json({ message: 'Create team endpoint', team })
  } catch (error) {
    res.status(500).json({ message: 'Failed to create team', error })
  }
})

export default router
