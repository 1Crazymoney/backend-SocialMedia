import { Router } from 'express';
import { auth } from "../../middlewares/auth.js";
import { isSuperAdmin } from '../../middlewares/isSuperAdmin.js';
import { getAllUsers, getUserProfile, updateUserProfile, getFollowers, followUser, unfollowUser, updateUserAdmin, deleteUserAdmin, getUserById } from './users.controller.js';

const router = Router()

router.get('/', auth, isSuperAdmin, getAllUsers) //View all users (superadmin)
router.get('/profile', auth, getUserProfile) //View users profile
router.put('/profile', auth, updateUserProfile) //Update user profile
router.get('/followers', auth, getFollowers); // Get followers of a user
router.post('/follow/:id', auth, followUser); // Follow a user
router.post('/unfollow/:id', auth, unfollowUser); // Unfollow a user
router.put('/admin/:id', auth, isSuperAdmin, updateUserAdmin) //Update user ADMIN
router.delete('/admin/:id', auth, isSuperAdmin, deleteUserAdmin) //Delete user ADMIN
router.get('/:userId', auth, getUserById);

export { router }