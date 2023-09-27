import { app } from './app'
import { env } from './env'

app.listen({
    port: env.PORT,
    host: '127.0.0.1'
})
.then(() => console.log('Server running on http://localhost:3333'))