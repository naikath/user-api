import bcrypt from 'bcrypt'

const saltRounds = 10
const salt = await bcrypt.genSalt(saltRounds)

export async function genHashedPassword(password: string) {
	const hash = await bcrypt.hash(password, salt)
	return hash
}

export async function comparePassword(password: string, hash: string) {
	const passwordMatches = await bcrypt.compare(password, hash)
	return passwordMatches
}
