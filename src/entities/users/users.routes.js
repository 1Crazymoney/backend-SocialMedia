import { Router } from 'express';
import { getAllUsers, getUserProfile, updateUserProfile } from './users.controller.js';

const router = Router()

router.get('/', auth, isSuperAdmin, getAllUsers) //View all users (superadmin)
router.get('/profile', auth, getUserProfile) //View users profile
router.put('/profile', auth, updateUserProfile) //Update user profile

export { router }