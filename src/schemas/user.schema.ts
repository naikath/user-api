import { z } from 'zod'

const userSchema = z.object({
	username: z.string(),
	password: z.string(),
})

export function validateUserData(input: any) {
	return userSchema.safeParse(input)
}
