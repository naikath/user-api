type Prettify<T> = {
	[Key in keyof T]: T[Key]
} & {}

type User = {
	id: string
	username: string
	password: string
}

// type UserQuery = Prettify<Partial<Omit<User, 'id'>>>

type FRequest = import('fastify').FastifyRequest
type FReply = import('fastify').FastifyReply
type FDone = import('fastify').DoneFuncWithErrOrRes

type FRegisterOpts = import('fastify').RegisterOptions
type FInstance = import('fastify').FastifyInstance
type FPluginOpts = import('fastify').FastifyPluginOptions
