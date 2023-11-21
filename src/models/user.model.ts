import { validateUserData } from '../schemas/user.schema.js'

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

	getUserById(id?: string) {
		if (!id) return false
		const user = data.find(user => user.id === id)
		if (!user) return false
		return user
	}

	setUser(queryData: UserQuery) {
		const result = validateUserData(queryData)

		if (!result.success) {
			console.error(result.error.issues)
			return false
		}

		id = (Number(id) + 1).toString()

		const newUser = {
			id,
			...result.data,
		}
		data.push(newUser)

		return true
	}

	deleteUserById(id?: string) {
		if (!id) return false

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
