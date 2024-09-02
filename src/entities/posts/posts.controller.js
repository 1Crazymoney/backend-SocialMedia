import mongoose from 'mongoose';
import { Types } from 'mongoose';
import Post from './posts.model.js';
import User from '../users/users.model.js';

export const createNewPost = async (req, res) => {
	try {
	  const { description } = req.body;
	  const image = req.file ? req.file.path : null;
	  const userId = req.tokenData.userId;
  
	  if (!description) {
		return res.status(400).json({
		  success: false,
		  message: 'Description is required',
		});
	  }
  
	  const newPost = await Post.create({
		user: userId,
		description,
		image,
	  });
  
	  const user = await User.findById(userId);
	  if (!user) {
		throw new Error('User not found');
	  }
  
	  res.status(201).json({
		success: true,
		message: 'New post created successfully',
		data: {
		  userEmail: user.email,
		  post: newPost,
		},
	  });
	} catch (error) {
	  res.status(500).json({
		success: false,
		message: 'Error creating post',
		error: error.message,
	  });
	}
  };
//Delete post by id (params) USER
export const deletePost = async (req, res) => {
	try {
		const postId = req.params._id;
		const postToDeleteValid = Types.ObjectId.isValid(postId);
		const userId = req.tokenData.userId;

		const postToDelete = await Post.findOne({
			_id: postId,
			user: userId,
		});
		if (!postToDelete) {
			return res.status(404).json({
				succes: false,
				message: 'You only can delete your own posts',
			});
		}
		if (!postToDeleteValid) {
			res.status(400).json({
				succes: false,
				message: 'Post id not valid',
			});
		}
		await Post.deleteOne(postToDelete);
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

		//2. Find posts in the database and populate the user field
		const myPosts = await Post.find({ user: userId }).populate('user', 'first_name last_name user_name profilePicture');

		//3. Validate userId and posts
		if (!userId) {
			return res.status(404).json({
				success: false,
				message: 'User not found',
			});
		}

		if (!myPosts || myPosts.length === 0) {
			return res.status(404).json({
				success: false,
				message: "You don't have any posts yet",
			});
		}

		//4. Response with posts and populated user data
		res.status(200).json({
			success: true,
			message: 'All your posts retrieved successfully',
			data: myPosts,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: 'Error retrieving your posts',
			error: error.message,
		});
	}
};


export const getAllPosts = async (req, res) => {
	try {
	  const allPosts = await Post.find()
		.populate({
		  path: 'user',
		  select: 'first_name last_name user_name profilePicture',
		})
		.exec();
  
	  res.status(200).json({
		success: true,
		message: 'All posts retrieved successfully',
		data: allPosts,
	  });
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
		const postId = req.params._id;

		//2. Validate information
		const idPostValid = Types.ObjectId.isValid(postId);
		if (!idPostValid) {
			res.status(400).json({
				succes: false,
				message: 'Id post is not valid',
			});
		}
		//3. Find in database
		const post = await Post.findOne({
			_id: postId,
		});

		//4. Response
		res.status(200).json({
			succes: true,
			message: 'Post retrieved successfully',
			data: post,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: 'Error retrieving post',
			error: error.message,
		});
	}
};

//Get post by user (params)
export const getPostsByUser = async (req, res) => {
	try {
		// 1. Get information
		const userId = req.params._id;

		// 2. Validate information
		if (!userId) {
			return res.status(400).json({
				success: false,
				message: 'User id is required',
			});
		}
		const userValid = mongoose.Types.ObjectId.isValid(userId);
		if (!userValid) {
			return res.status(400).json({
				success: false,
				message: 'Invalid user id',
			});
		}

		// 3. Find in database
		const userPosts = await Post.find({ user: userId });

		if (userPosts.length === 0) {
			return res.status(404).json({
				success: false,
				message: 'Make your first post!',
			});
		}

		// 4. Response
		return res.status(200).json({
			success: true,
			message: 'User posts retrieved successfully',
			data: userPosts,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: 'Error retrieving user posts',
			error: error.message,
		});
	}
};


export const likeOrNot = async (req, res) => {
	try {
		const postId = req.params._id;
		const userId = req.tokenData.userId;

		const post = await Post.findById(postId);
		if (!post) {
			return res.status(404).json({
				success: false,
				message: 'Post not found',
			});
		}

		const isLiked = post.likes.indexOf(userId);

		if (isLiked !== -1) {
			post.likes.splice(isLiked, 1);
		} else {
			post.likes.push(userId);
		}
		await post.save();

		res.status(200).json({
			success: true,
			message:
				isLiked !== -1
					? 'Post removed from favourites'
					: 'Post added to favourites',
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: 'Error adding or deleting like from this post',
			error: error.message,
		});
	}
};

//ADMIN
export const updatePostAdmin = async (req, res) => {
	try {
	  const postId = req.params._id;
	  const { description, image } = req.body;
  
	  const postToUpdateValid = Types.ObjectId.isValid(postId);
  
	  if (!postToUpdateValid) {
		res.status(400).json({
		  success: false,
		  message: 'Post id not valid',
		});
	  }
  
	  const postToUpdate = await Post.findOne({ _id: postId });
	  if (!postToUpdate) {
		res.status(404).json({
		  success: false,
		  message: 'Post not found',
		});
	  }
  
	  if (description) {
		postToUpdate.description = description;
	  }
	  if (image) {
		postToUpdate.image = image;
	  }
  
	  await postToUpdate.save();
  
	  res.status(200).json({
		success: true,
		message: 'Post updated successfully',
		data: postToUpdate,
	  });
	} catch (error) {
	  res.status(500).json({
		success: false,
		message: 'Error updating post',
		error: error.message,
	  });
	}
  };

  export const deletePostAdmin = async (req, res) => {
	try {
	  const postId = req.params._id;
	  const postToDeleteValid = Types.ObjectId.isValid(postId);
  
	  if (!postToDeleteValid) {
		res.status(400).json({
		  success: false,
		  message: 'Post id not valid',
		});
	  }
  
	  const postToDelete = await Post.findOne({ _id: postId });
	  if (!postToDelete) {
		res.status(404).json({
		  success: false,
		  message: 'Post not found',
		});
	  }
  
	  await Post.deleteOne({ _id: postId });
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