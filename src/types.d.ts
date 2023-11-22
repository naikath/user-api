type Prettify<T> = {
	[Key in keyof T]: T[Key]
} & {}

type User = {
	id: string
	username: string
	password: string
}

// type UserQuery = Prettify<Partial<Omit<User, 'id'>>>
