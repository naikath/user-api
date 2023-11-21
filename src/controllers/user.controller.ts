import type { Request, Response } from 'express'
import { UserModel } from '../models/user.model.js'
import { validateUserData } from '../schemas/user.schema.js'

const userModel = new UserModel()

export class UserController {
	constructor() {}

	getAllUsers(_req: Request, res: Response) {
		res.send(userModel.getAllUsers())
	}

	getUserById(req: Request, res: Response) {
		const { id } = req.params
		if (!id) {
			res.status(400).send('Id not provided')
			return
		}

		const user = userModel.getUserById(id)
		if (!user) {
			res.status(404).send('User not found')
			return
		}

		res.send(user)
	}

	setUser(req: Request, res: Response) {
		const result = validateUserData(req.body)
		if (!result.success) {
			res.status(400).send(result.error.issues)
			return
		}

		res.send(userModel.setUser(result.data))
	}

	deleteUserById(req: Request, res: Response) {
		const { id } = req.params
		if (!id) {
			res.status(400).send('Id not provided')
			return
		}

		res.send(userModel.deleteUserById(id))
	}
}
