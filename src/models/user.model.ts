import type { ParsedUserData } from '../schemas/user.schema.js'
import { db } from '../database/db.js'
import { usersTable } from '../database/schema.js'

let data: User[] = [
	{
		id: '1',
		username: 'username',
		password: 'password',
	},
]

let id = '1'

export class UserModel {
	constructor() {}

	async getAllUsers() {
		return await db.select().from(usersTable)
	}

	async getUserById(id: string) {
		const user = data.find(user => user.id === id)
		if (!user) return false
		return user
	}

	async setUser(userData: ParsedUserData) {
		id = (Number(id) + 1).toString()

		const newUser = {
			id,
			...userData,
		}
		data.push(newUser)

		return true
	}

	async deleteUserById(id: string) {
		let deletedUser = false

		data = data.filter(user => {
			if (user.id === id) {
				deletedUser = true
				return false
			}
			return true
		})
		return deletedUser
	}
}
