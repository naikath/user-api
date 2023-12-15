import type { ParsedUserData } from '../schemas/user.schema.js'
import { db, usersTable } from '../database/db.js'
import { eq } from 'drizzle-orm'
import { comparePassword, genHashedPassword } from '../utils/password.js'
import type { ResultModel, ResultObjectSuccess, ResultObjectError } from './user.model.types.js'

class ModelSuccess implements ResultObjectSuccess {
	success = true as const

	constructor() {}
}

class ModelError implements ResultObjectError {
	success = false as const
	error = 'UNEXPECTED'

	constructor(errorCode?: string) {
		if (errorCode) {
			this.error = errorCode
		}
	}
}

export class UserModel {
	constructor() {}

	async getAllUsers() {
		return await db.select().from(usersTable)
	}

	async getUserById(id: number) {
		const [user] = await db.select().from(usersTable).where(eq(usersTable.id, id))
		if (!user) {
			return false
		}

		return user
	}

	async setUser(userData: ParsedUserData): ResultModel {
		const { username, password } = userData
		const hashedPassword = await genHashedPassword(password)
		const result = await db
			.insert(usersTable)
			.values({ username, password: hashedPassword })
			.then(value => {
				if (value.changes === 0) {
					return new ModelError('other')
				}

				return new ModelSuccess()
			})
			.catch(err => {
				console.error('Error:', err?.code, err?.message)
				return new ModelError('user')
			})

		return result
	}

	async deleteUserById(id: number): ResultModel {
		const result = await db.delete(usersTable).where(eq(usersTable.id, id))
		if (result.changes === 0) {
			return new ModelError('user')
		}

		return new ModelSuccess()
	}

	async loginUser(userData: ParsedUserData): ResultModel {
		const { username, password } = userData

		const [user] = await db
			.select({ password: usersTable.password })
			.from(usersTable)
			.where(eq(usersTable.username, username))

		if (!user) {
			return new ModelError('user')
		}

		const isValidPassword = await comparePassword(password, user.password)
		if (!isValidPassword) {
			return new ModelError('password')
		}

		return new ModelSuccess()
	}
}
