import type { ParsedUserData } from '../schemas/user.schema.js'

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

	getAllUsers() {
		return data
	}

	getUserById(id: string) {
		const user = data.find(user => user.id === id)
		if (!user) return false
		return user
	}

	setUser(userData: ParsedUserData) {
		id = (Number(id) + 1).toString()

		const newUser = {
			id,
			...userData,
		}
		data.push(newUser)

		return true
	}

	deleteUserById(id: string) {
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
