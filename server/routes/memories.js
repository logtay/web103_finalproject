import express from 'express'
import MemoriesController from '../controllers/memories.js'

const router = express.Router()

router.get('/', MemoriesController.getMemories)
router.get('/:id', MemoriesController.getMemoryById)
router.post('/', MemoriesController.createMemory)
router.delete('/:id', MemoriesController.deleteMemory)
router.patch('/:id', MemoriesController.updateMemory)

export default router