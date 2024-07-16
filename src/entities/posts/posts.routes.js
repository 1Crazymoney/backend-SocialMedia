import { Router } from 'express';
import { createNewPost, deletePost, updatePost, getMyPosts, getAllPosts, getPostById,getPostByUser, likeOrNot } from './posts.controller.js';

const router = Router()

router.post('/', auth, createNewPost) //Create new post
router.delete('/:id', auth, deletePost) //Delete post by id (params)
router.put('/', auth, updatePost) //Update post by id (body)
router.get('/own', auth, getMyPosts) //Get my own posts
router.get('/', getAllPosts) //Get all posts
router.get('/', getPostById) //Get post by id
router.get('/:user-id', auth, getPostByUser) //Get post by user

router.put('like/:id', auth, likeOrNot) //Like and dislike



export { router }