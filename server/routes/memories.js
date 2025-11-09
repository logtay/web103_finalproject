import express from 'express'
import MemoryController from '../controllers/memories.js'

const router = express.Router()

router.get('/', MemoryController.getMemories)
router.get('/:id', MemoryController.getMemoryById)
router.post('/', MemoryController.createMemories)
router.put('/:id', MemoryController.updateMemories)
router.delete('/:id', MemoryController.deleteMemories)

export default router