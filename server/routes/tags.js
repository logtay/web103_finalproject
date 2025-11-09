import express from 'express'
import TagsController from '../controllers/tags.js'

const router = express.Router()

router.get('/', TagsController.getTags)
router.get('/:id', TagsController.getTagById)
router.post('/', TagsController.createTag)
router.delete('/:id', TagsController.deleteTag)

export default router