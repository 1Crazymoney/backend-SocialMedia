import { Router } from 'express';
import { auth } from '../../middlewares/auth.js';
import {
	createNewPost,
	deletePost,
	updatePost,
	getMyPosts,
	getAllPosts,
	getPostById,
	getPostByUser,
	likeOrNot,
} from './posts.controller.js';

const router = Router();

router.post('/', auth, createNewPost); //Create new post
router.delete('/:id', auth, deletePost); //Delete post by id (params)
router.put('/', auth, updatePost); //Update post by id (body)
router.get('/own', auth, getMyPosts); //Get my own posts
router.get('/', auth, getAllPosts); //Get all posts
router.get('/:id', auth, getPostById); //Get post by id
router.get('/users/:user_id', auth, getPostByUser); //Get post by user

router.put('like/:id', auth, likeOrNot); //Like and dislike

export { router };
