import express, { Application } from 'express'
import morgan from 'morgan'
import cors from 'cors'
import compression from 'compression'
import helmet from 'helmet'
import connectDB from './db/connect'
import Controller from './routes/interfaces'
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware'


class App {
    public express: Application
    public port: number
    public connectionString: string

    constructor (controllers: Controller[], port: number, connectionString: string) {
        this.express = express()
        this.port = port
        this.connectionString = connectionString

        this.initialiseConnections()
        this.initialiseMiddleware()
        this.initialiseControllers(controllers)
        this.initialiseErrorHandling()
    }

    private initialiseConnections() {
        connectDB(this.connectionString)
        .then((result): void => {
            console.log('Connected to DB')
            this.express.listen(this.port, (): void => {console.log(`Listening on port ${this.port}`)})
        })
    }

    private initialiseMiddleware() {
        this. express.use(helmet())
        this. express.use(cors())
        this. express.use(morgan('dev'))
        this. express.use(express.json())
        this. express.use(express.urlencoded({extended: false}))
        this.express.use(compression())
    }

    private initialiseControllers(controllers: Controller[]): void {
        controllers.forEach((controller: Controller) => {
            this.express.use('/api', controller.router)
        })
    }

    private initialiseErrorHandling() {
        this.express.use(errorHandlerMiddleware)
    }
}

export default App