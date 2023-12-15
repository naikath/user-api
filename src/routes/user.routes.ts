import { UserController } from '../controllers/user.controller.js'

export async function userRouter(instance: FInstance) {
	const userController = new UserController()

	// instance.get('/', userController.getAllUsers)

	// instance.get('/:id', userController.getUserById)

	// instance.post('/', userController.setUser)

	// instance.post('/login', userController.loginUser)

	// instance.delete('/:id', userController.deleteUserById)

	instance.all('*', async (_request: FRequest, reply: FReply) => {
		console.log('Accessed router')
		return reply.code(404).send('Route not found')
	})
}
