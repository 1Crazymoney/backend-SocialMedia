import { Router } from 'express';
import { router as userRoutes } from './entities/users/users.routes.js'

const router = Router()

router.use('/users', userRoutes)

export { router }