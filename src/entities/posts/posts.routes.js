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
router.put('/', auth, updatePost);

// Obtener los posts del usuario
router.get('/own', auth, getMyPosts);

// Obtener todos los posts
router.get('/', auth, getAllPosts);

// Obtener un post por id
router.get('/:id', auth, getPostById);

// Obtener los posts de un usuario específico
router.get('/users/:user_id', auth, getPostsByUser);

// Like y dislike de un post
router.put('/like/:id', auth, likeOrNot);

// Actualizar post ADMIN
router.put('/admin/:id', auth, isSuperAdmin, updatePostAdmin);

// Eliminar post por id
router.delete('/:id', auth, deletePost);

// Eliminar post por id
router.delete('/admin/:id', auth, isSuperAdmin, deletePostAdmin);

export { router };
