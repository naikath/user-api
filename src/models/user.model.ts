import type { ParsedUserData } from '../schemas/user.schema.js'
import { db, usersTable } from '../database/db.js'
import { eq } from 'drizzle-orm'
import { comparePassword, genHashedPassword } from '../utils/password.js'

export class UserModel {
	constructor() {}

	async getAllUsers() {
		return await db.select().from(usersTable)
	}

	async getUserById(id: number) {
		const [user] = await db.select().from(usersTable).where(eq(usersTable.id, id))
		if (!user) return false
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
					return {
						success: false,
						error: 'other',
					}
				}

				return { success: true } as const
			})
			.catch(err => {
				console.error('Error:', err?.code)
				return {
					success: false,
					error: 'user',
				}
			})

		return result
	}

	async deleteUserById(id: number): ResultModel {
		const result = await db.delete(usersTable).where(eq(usersTable.id, id))
		if (result.changes === 0) return { success: false, error: 'user' }
		return { success: true }
	}

	async loginUser(userData: ParsedUserData): ResultModel {
		const { username, password } = userData

		const [user] = await db
			.select({ password: usersTable.password })
			.from(usersTable)
			.where(eq(usersTable.username, username))

		if (!user) return { success: false, error: 'user' }

		const isValidPassword = await comparePassword(password, user.password)
		if (!isValidPassword) return { success: false, error: 'password' }

		return { success: true }
	}
}
