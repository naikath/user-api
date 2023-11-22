import { db } from './db.js'
import { usersTable } from './schema.js'

async function testOrm() {
	let result

	result = await db.select().from(usersTable)
	console.log(result)

	result = await db.insert(usersTable).values({ username: 'newuser', password: 'mypassword' })
	console.log(result)

	result = await db.select().from(usersTable)
	console.log(result)

	result = await db.delete(usersTable)
	console.log(result)
}

// await testOrm()
