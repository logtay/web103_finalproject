import express from 'express'
import UsersController from '../controllers/users.js'

const router = express.Router()

router.get('/', UsersController.getUsers)
router.get('/:id', UsersController.getUserById)
router.post('/', UsersController.createUser)
router.delete('/:id', UsersController.deleteUser)
router.patch('/:id', UsersController.updateUser)

export default router