import Fastify from 'fastify'
import { userRouter } from './routes/user.routes.js'

const fastify = Fastify({
	// logger: true,
	ignoreTrailingSlash: true,
})

const port = process.env.PORT ?? 3000

fastify.register(userRouter)

try {
	console.log(`Listening on port ${port}`)
	await fastify.listen({ port: 3000 })
} catch (err) {
	fastify.log.error(err)
	process.exit(1)
}
