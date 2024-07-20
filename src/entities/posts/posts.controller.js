import mongoose from 'mongoose';
import { Types } from 'mongoose';
import Post from './posts.model.js';
import User from '../users/users.model.js';

//Create new post
export const createNewPost = async (req, res) => {
	try {
		const { description, image } = req.body;
		const userId = req.tokenData.userId;
		if (!description) {
			console.log(2);
			throw new Error('Description is required');
		}
		const newPost = await Post.create({
			user: userId,
			description: description,
			image: image,
		});
		const user = await User.findById(userId);
		if (!user) {
			throw new Error('User not found');
		}
		res.status(201).json({
			success: true,
			message: 'New post created succesfully',
			data: {
				userEmail: user.email,
				post: newPost,
			},
		});
	} catch (error) {
		if (error.message == 'Description is required') {
			return res.status(400).json({
				success: false,
				message: 'Title and description are required',
				error: error.message,
			});
		}
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
		const postId = req.params.id;
		const postToDeleteValid = Types.ObjectId.isValid(postId);

		const deletedPost = await Post.findByIdAndDelete(postId);
		if (!deletedPost) {
			return res.status(404).json({
				succes: false,
				message: 'Post not found',
			});
		}
		if (!postToDeleteValid) {
			res.status(400).json({
				succes: false,
				message: 'Id not valid',
			});
		}
		res.status(200).json({
			success: true,
			message: 'Post deleted successfully',
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: 'Error deleting post',
			error: error.message,
		});
	}
};

//Update post by id (body)
export const updatePost = async (req, res) => {
	try {
		// 1. Get information
		const userId = req.tokenData.userId;
		const { postId, description, image } = req.body;

		// 2. Validate information
		if (!postId) {
			throw new Error('postId is required');
		}
		if (!userId) {
			return res.status(404).json({
				success: false,
				message: 'User not found',
			});
		}
		const post = await Post.findOne({
			_id: postId,
			user: userId,
		});
		if (!post) {
			return res.status(404).json({
				success: false,
				message: 'Post not found',
			});
		}

		// 3. Save in database
		if (description) {
			post.description = description;
		}
		if (image) {
			post.image = image;
		}

		await post.save();

		// 4. Response
		res.status(200).json({
			success: true,
			message: 'Post updated successfully',
			data: post,
		});
	} catch (error) {
		if (error.message === 'postId is required') {
			return res.status(400).json({
				success: false,
				message: 'postId is required',
				error: error.message,
			});
		}
		res.status(500).json({
			success: false,
			message: 'Error updating post',
			error: error.message,
		});
	}
};

//Get my own posts
export const getMyPosts = async (req, res) => {
	try {
		//1. Get information
		const userId = req.tokenData.userId;
		//2. Find in database
		const myPosts = await Post.find({ user: userId })
		//3. Validate information
		if(!userId){
			res.status(404).json(
				{
					success: false,
					message: 'User not found'
				}
			)
		}
		if(!myPosts){
			res.status(404).json(
				{
					success: false,
					message: "You don't have any posts yet"
				}
			)
		}
		//4. Response
		res.status(200).json(
			{
				succes: true,
				message: 'All your posts retrieved successfully',
				data: myPosts
			}
		)

	} catch (error) {
		res.status(500).json({
			success: false,
			message: 'Error retrieving your posts',
			error: error.message,
		});
	}
};

//Get all posts
export const getAllPosts = async (req, res) => {
	try {
		//1. Get information
		const allPosts = await Post.find()

		//2. Response
		res.status(200).json(
			{
				succes: true,
				message: 'All posts retrieved successfully',
				data: allPosts
			}
		)

	} catch (error) {
		res.status(500).json({
			success: false,
			message: 'Error retrieving posts',
			error: error.message,
		});
	}
};

//Get post by id (params)
export const getPostById = async (req, res) => {
	try {
		//1. Get information
		const postId = req.params.id;

		//2. Validate information
		const idPostValid = Types.ObjectId.isValid(postId);
		if (!idPostValid){
			res.status(400).json(
				{
					succes: false,
					message: 'Id post is not valid'
				}
			)
		}
		//3. Find in database
		const post = await Post.findOne({
			_id: postId,
		});

		//4. Response
		res.status(200).json(
			{
				succes: true,
				message: 'Post retrieved successfully',
				data: post
			}
		)

	} catch (error) {
		res.status(500).json({
			success: false,
			message: 'Error retrieving post',
			error: error.message,
		});
	}
};

//Get post by user (params)
export const getPostByUser = async (req, res) => {
	try {
		// 1. Get information
		const userId = req.params.user_id;

		// 2. Validate information
		if (!userId) {
			return res.status(400).json({
				success: false,
				message: 'User id is required'
			});
		}
		const userValid = mongoose.Types.ObjectId.isValid(userId)
		if (!userValid) {
			return res.status(400).json({
				success: false,
				message: 'Invalid user id'
			});
		}

		// 3. Find in database
		const userPosts = await Post.find({ user: userId });

		if (userPosts.length === 0) {
			return res.status(404).json({
				success: false,
				message: 'No posts found for this user'
			});
		}

		// 4. Response
		return res.status(200).json({
			success: true,
			message: 'User posts retrieved successfully',
			data: userPosts
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: 'Error retrieving user posts',
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
