import type { Request, Response } from 'express'
import { UserModel } from '../models/user.model.js'
import { validateUserData } from '../schemas/user.schema.js'

const userModel = new UserModel()

export class UserController {
	constructor() {}

	async getAllUsers(_req: Request, res: Response) {
		res.send(await userModel.getAllUsers())
	}

	async getUserById(req: Request, res: Response) {
		const { id } = req.params
		if (!id) {
			res.status(400).send('Id not provided')
			return
		}

		const user = await userModel.getUserById(id)
		if (!user) {
			res.status(404).send('User not found')
			return
		}

		res.send(user)
	}

	async setUser(req: Request, res: Response) {
		const result = validateUserData(req.body)
		if (!result.success) {
			res.status(400).send(result.error.issues)
			return
		}

		res.send(await userModel.setUser(result.data))
	}

	async deleteUserById(req: Request, res: Response) {
		const { id } = req.params
		if (!id) {
			res.status(400).send('Id not provided')
			return
		}

		res.send(await userModel.deleteUserById(id))
	}
}
