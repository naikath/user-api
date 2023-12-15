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

		const user = await userModel.getUserById(Number(id))
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

		const resultModel = await userModel.setUser(result.data)

		if (!resultModel.success) {
			if (resultModel.error === 'user') {
				res.status(400).send('Error, user already exists')
				return
			}

			if (resultModel.error === 'other') {
				res.status(500).send('Unexpected error while creating the user')
				return
			}
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
			if (resultModel.error === 'user') {
				res.status(404).send('User not found')
				return
			}
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
			if (resultModel.error === 'user' || resultModel.error === 'password') {
				res.status(401).send(`Login denied, user or password not matched`)
				return
			}
		}

		res.send('Login successful')
	}
}
