import express from 'express'
import { UserController } from '../controllers/user.controller.js'

export const userRouter = express.Router()
const userController = new UserController()

userRouter.get('/', userController.getAllUsers)

userRouter.get('/:id', userController.getUserById)

userRouter.post('/', userController.setUser)

userRouter.post('/login', userController.loginUser)

userRouter.delete('/:id', userController.deleteUserById)

userRouter.use((_req, res) => {
	res.send('Accessed Router')
})
