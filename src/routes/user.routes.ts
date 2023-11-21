import express from 'express'
import { UserController } from '../controllers/user.controller.js'

export const userRouter = express.Router()
const userController = new UserController()

userRouter.get('/', userController.getAllUsers)
