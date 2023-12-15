import type { ParsedUserData } from '../schemas/user.schema.js'
import { db, usersTable } from '../database/db.js'
import { eq } from 'drizzle-orm'
import { comparePassword, genHashedPassword } from '../utils/password.js'
import { ModelSuccess, ModelError } from './user.model.types.js'

export class UserModel {
	constructor() {}

	async getAllUsers() {
		const users = await db.select().from(usersTable)

		return new ModelSuccess(users)
	}

	async getUserById(id: number) {
		const [user] = await db.select().from(usersTable).where(eq(usersTable.id, id))
		if (!user) {
			return new ModelError('USER_NOT_EXISTS')
		}

		return new ModelSuccess(user)
	}

	async setUser(userData: ParsedUserData) {
		const { username, password } = userData
		const hashedPassword = await genHashedPassword(password)

		try {
			const result = await db.insert(usersTable).values({ username, password: hashedPassword })

			if (result.changes === 0) {
				return new ModelError('UNEXPECTED')
			}

			return new ModelSuccess()
		} catch (error) {
			if (error instanceof Error) {
				console.error('Error:', error.message)
			}

			return new ModelError('USER_EXISTS')
		}
	}

	async deleteUserById(id: number) {
		const result = await db.delete(usersTable).where(eq(usersTable.id, id))
		if (result.changes === 0) {
			return new ModelError('USER_NOT_EXISTS')
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
			return new ModelError('LOGIN_INVALID')
		}

		const isValidPassword = await comparePassword(password, user.password)
		if (!isValidPassword) {
			return new ModelError('LOGIN_INVALID')
		}

		return new ModelSuccess()
	}
}
