import { Router } from 'express';
import { register } from './users.controller.js';

const router = Router()

router.post('/register', register)
router.post('login', login)

export { router }