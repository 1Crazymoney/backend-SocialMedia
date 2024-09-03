import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import { auth } from '../../middlewares/auth.js';
import {
	createNewPost,
	deletePost,
	updatePost,
	getMyPosts,
	getAllPosts,
	getPostById,
	getPostsByUser,
	likeOrNot,
	updatePostAdmin,
	deletePostAdmin,
} from './posts.controller.js';
import { isSuperAdmin } from '../../middlewares/isSuperAdmin.js';

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'uploads/');
	},
	filename: (req, file, cb) => {
		cb(null, Date.now() + path.extname(file.originalname));
	},
});

const upload = multer({ storage });

const router = Router();

router.post('/', auth, upload.single('image'), createNewPost);

// Crear nuevo post
router.post('/', auth, upload.single('image'), createNewPost);

// Actualizar post
router.put('/:_id', auth, updatePost);

// Obtener los posts del usuario
router.get('/own', auth, getMyPosts);

// Obtener todos los posts
router.get('/', auth, getAllPosts);

// Obtener un post por id
router.get('/:_id', auth, getPostById);

// Obtener los posts de un usuario específico
router.get('/users/:_id', auth, getPostsByUser);

// Like y dislike de un post
router.put('/like/:_id', auth, likeOrNot);

// Actualizar post ADMIN
router.put('/admin/:_id', auth, isSuperAdmin, updatePostAdmin);

// Eliminar post por id USER
router.delete('/:_id', auth, deletePost);

// Eliminar post por id
router.delete('/admin/:_id', auth, isSuperAdmin, deletePostAdmin);

export { router };
