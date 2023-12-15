import type { Request, Response } from 'express'
import { UserModel } from '../models/user.model.js'
import { validateUserData } from '../schemas/user.schema.js'

const userModel = new UserModel()

export class UserController {
	constructor() {}

	async getAllUsers(_req: Request, res: Response) {
		const resultModel = await userModel.getAllUsers()

		res.send(resultModel.data)
	}

	async getUserById(req: Request, res: Response) {
		const { id } = req.params
		if (!id) {
			res.status(400).send('Id not provided')
			return
		}

		const resultModel = await userModel.getUserById(Number(id))

		if (!resultModel.success) {
			res.status(404).send('User not found')
			return
		}

		res.send(resultModel.data)
	}

	async setUser(req: Request, res: Response) {
		const result = validateUserData(req.body)
		if (!result.success) {
			res.status(400).send(result.error.issues)
			return
		}

		const resultModel = await userModel.setUser(result.data)

		if (!resultModel.success) {
			res.status(400).send('Error, user already exists')
			return
		}

		res.send('User created')
	}

	async deleteUserById(req: Request, res: Response) {
		const { id } = req.params
		if (!id) {
			res.status(400).send('Id not provided')
			return
		}

		const resultModel = await userModel.deleteUserById(Number(id))

		if (!resultModel.success) {
			res.status(404).send('User not found')
			return
		}

		res.send('User deleted')
	}

	async loginUser(req: Request, res: Response) {
		const result = validateUserData(req.body)
		if (!result.success) {
			res.status(400).send(result.error.issues)
			return
		}

		const resultModel = await userModel.loginUser(result.data)

		if (!resultModel.success) {
			res.status(401).send(`Login denied, user or password not matched`)
			return
		}

		res.send('Login successful')
	}
}
