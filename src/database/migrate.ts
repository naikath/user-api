import { migrate } from 'drizzle-orm/better-sqlite3/migrator'
import { db } from './db.js'
import { fileURLToPath } from 'node:url'

const migrationsPath = fileURLToPath(new URL('../../drizzle/migrations', import.meta.url))

migrate(db, { migrationsFolder: migrationsPath })
