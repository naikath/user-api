import type { Config } from 'drizzle-kit'

export default {
	schema: './src/database/schema.ts',
	out: './drizzle/migrations',
	driver: 'better-sqlite',
} satisfies Config
