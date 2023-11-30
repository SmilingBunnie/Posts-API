import { Request, Response, Router } from 'express'
import Controller from '../routes/interfaces'
import validationMiddleware from '../validation/post.validation'
import { createPost } from '../controllers/post'

class Post implements Controller {
    public path = '/posts'
    public router = Router()

    constructor() {
        this.initialiseRoutes()
    }
    private initialiseRoutes() {
        this.router.route(this.path).post(validationMiddleware, createPost)
    }

}

export default Post