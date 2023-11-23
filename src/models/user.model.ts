import type { ParsedUserData } from '../schemas/user.schema.js'
import { db, usersTable } from '../database/db.js'
import { eq } from 'drizzle-orm'
import { genHashedPassword } from '../utils/password.js'

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

	async setUser(userData: ParsedUserData) {
		const { username, password } = userData
		const hashedPassword = await genHashedPassword(password)
		const result = await db.insert(usersTable).values({ username, password: hashedPassword })
		if (result.changes === 0) return false
		return true
	}

	async deleteUserById(id: number) {
		const result = await db.delete(usersTable).where(eq(usersTable.id, id))
		if (result.changes === 0) return false
		return true
	}
}
