import { Router } from 'express';
import { router as userRoutes } from './entities/users/users.routes.js';
import { router as authRoutes } from './entities/auth/auth.routes.js';

const router = Router()

router.use('/auth', authRoutes)
router.use('/users', userRoutes)
router.use('/posts', postRoutes)

export { router }