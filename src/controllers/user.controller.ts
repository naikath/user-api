import type { Request, Response } from 'express'
import { UserModel } from '../models/user.model.js'

const userModel = new UserModel()

export class UserController {
	constructor() {}

	getAllUsers(req: Request, res: Response) {
		console.log('Users')
		res.send(userModel.getAllUsers())
	}
}
