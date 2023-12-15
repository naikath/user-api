import { UserModel } from '../models/user.model.js'
import { validateUserData } from '../schemas/user.schema.js'

const userModel = new UserModel()

export class UserController {
	constructor() {}

	async getAllUsers(_req: FRequest, reply: FReply) {
		const resultModel = await userModel.getAllUsers()

		return reply.send(resultModel.data)
	}

	async getUserById(req: FRequest, reply: FReply) {
		const { id } = req.params as { id?: string }
		if (!id) {
			return reply.code(400).send('Id not provided')
		}

		const resultModel = await userModel.getUserById(Number(id))

		if (!resultModel.success) {
			return reply.code(404).send('User not found')
		}

		return reply.send(resultModel.data)
	}

	async setUser(req: FRequest, reply: FReply) {
		const result = validateUserData(req.body)
		if (!result.success) {
			return reply.code(400).send(result.error.issues)
		}

		const resultModel = await userModel.setUser(result.data)

		if (!resultModel.success) {
			return reply.code(400).send('Error, user already exists')
		}

		return reply.send('User created')
	}

	async deleteUserById(req: FRequest, reply: FReply) {
		const { id } = req.params as { id?: string }
		if (!id) {
			return reply.code(400).send('Id not provided')
		}

		const resultModel = await userModel.deleteUserById(Number(id))

		if (!resultModel.success) {
			return reply.code(404).send('User not found')
		}

		return reply.send('User deleted')
	}

	async loginUser(req: FRequest, reply: FReply) {
		const result = validateUserData(req.body)
		if (!result.success) {
			return reply.code(400).send(result.error.issues)
		}

		const resultModel = await userModel.loginUser(result.data)

		if (!resultModel.success) {
			return reply.code(401).send(`Login denied, user or password not matched`)
		}

		return reply.send('Login successful')
	}
}
