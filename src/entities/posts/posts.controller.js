import Post from './posts.model.js';
import User from '../users/users.model.js';

//Create new post
export const createNewPost = async (req, res) => {
	try {
		const description = req.body.description;
		const image = req.body.image;
		const user = req.tokenData.userId;

		const newPost = await Post.create({
			description: description,
			image: image,
			user: user,
		});

		res.status(201).json({
			success: true,
			message: 'New post created succesfully',
			data: newPost,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: 'Error creating post',
			error: error.message,
		});
	}
};

//Delete post by id (params)
export const deletePost = async (req, res) => {
	try {
	} catch (error) {
		res.status(500).json({
			success: false,
			message: ' ',
			error: error.message,
		});
	}
};

//Update post by id (body)
export const updatePost = async (req, res) => {
	try {
	} catch (error) {
		res.status(500).json({
			success: false,
			message: ' ',
			error: error.message,
		});
	}
};

//Get my own posts
export const getMyPosts = async (req, res) => {
	try {
	} catch (error) {
		res.status(500).json({
			success: false,
			message: ' ',
			error: error.message,
		});
	}
};

//Get all posts
export const getAllPosts = async (req, res) => {
	try {
	} catch (error) {
		res.status(500).json({
			success: false,
			message: ' ',
			error: error.message,
		});
	}
};

//Get post by id
export const getPostById = async (req, res) => {
	try {
	} catch (error) {
		res.status(500).json({
			success: false,
			message: ' ',
			error: error.message,
		});
	}
};

//Get post by user
export const getPostByUser = async (req, res) => {
	try {
	} catch (error) {
		res.status(500).json({
			success: false,
			message: ' ',
			error: error.message,
		});
	}
};

//Like and dislike
export const likeOrNot = async (req, res) => {
	try {
	} catch (error) {
		res.status(500).json({
			success: false,
			message: ' ',
			error: error.message,
		});
	}
};
