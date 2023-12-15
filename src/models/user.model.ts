import type { ParsedUserData } from '../schemas/user.schema.js'
import { db, usersTable } from '../database/db.js'
import { eq } from 'drizzle-orm'
import { comparePassword, genHashedPassword } from '../utils/password.js'
import type { ResultObjectSuccess, ResultObjectError } from './user.model.types.js'

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

	async setUser(userData: ParsedUserData) {
		const { username, password } = userData
		const hashedPassword = await genHashedPassword(password)

		try {
			const result = await db.insert(usersTable).values({ username, password: hashedPassword })

			if (result.changes === 0) {
				return new ModelError('other')
			}

			return new ModelSuccess()
		} catch (error) {
			if (error instanceof Error) {
				console.error('Error:', error.message)
			}

			return new ModelError('user')
		}
	}

	async deleteUserById(id: number) {
		const result = await db.delete(usersTable).where(eq(usersTable.id, id))
		if (result.changes === 0) {
			return new ModelError('user')
		}

		return new ModelSuccess()
	}

	async loginUser(userData: ParsedUserData) {
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
