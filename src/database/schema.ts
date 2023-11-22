import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core'

export const usersTable = sqliteTable('users', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	username: text('username').notNull(),
	password: text('password').notNull(),
})

export type SelectUser = typeof usersTable.$inferSelect
export type InsertUser = typeof usersTable.$inferInsert
