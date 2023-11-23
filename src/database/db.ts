import { drizzle } from 'drizzle-orm/better-sqlite3'
import Database from 'better-sqlite3'
import { fileURLToPath } from 'node:url'

const dbPath = fileURLToPath(new URL('../../drizzle/sqlite.db', import.meta.url))

const betterSqlite = new Database(dbPath)

export const db = drizzle(betterSqlite)

// Re-exports
export { usersTable } from './schema.js'
export type { SelectUser, InsertUser } from './schema.js'
