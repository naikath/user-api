import type { Request, Response } from 'express'
import { UserModel } from '../models/user.model.js'

const userModel = new UserModel()

export class UserController {
	constructor() {}

	getAllUsers(req: Request, res: Response) {
		res.send(userModel.getAllUsers())
	}

	getUserById(req: Request, res: Response) {
		const { id } = req.params
		const user = userModel.getUserById(id)
		if (!user) {
			res.status(404).send('User not found')
			return
		}
		res.send(user)
	}

	setUser(req: Request, res: Response) {
		const { username, password } = req.body
		const data = { username, password }
		res.send(userModel.setUser(data))
	}

	deleteUserById(req: Request, res: Response) {
		const { id } = req.params
		res.send(userModel.deleteUserById(id))
	}
}
