import express from 'express'
import { userRouter } from './routes/user.routes.js'

const app = express()

const port = process.env.PORT ?? 3000

app.use(express.json())

app.use('/', userRouter)

app.listen(port, () => {
	console.log(`Listening on ${port}`)
})
