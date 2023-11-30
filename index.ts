import 'dotenv/config'
import App from './src/app'
import env from './src/validation/validate-env'
import Post from './src/routes/post'

const app = new App([new Post()], env.PORT, env.MONGO_URI)