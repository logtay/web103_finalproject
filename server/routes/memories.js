import express from 'express'
import MemoryController from '../controllers/memories.js'

const router = express.Router()

router.get('/', MemoryController.getMemories)
router.get('/:id', MemoryController.getMemoryById)
router.post('/', MemoryController.createMemory)
router.put('/:id', MemoryController.updateMemory)
router.delete('/:id', MemoryController.deleteMemory)

export default router