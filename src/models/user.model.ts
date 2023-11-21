type User = {
	id: string
	username: string
	password: string
}

const data: User[] = [
	{
		id: '1',
		username: 'username',
		password: 'password',
	},
]

export class UserModel {
	constructor() {}

	getAllUsers() {
		return data
	}
}
