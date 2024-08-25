import User from './users.model.js';
import bcrypt from 'bcrypt';

// Get all users
export const getAllUsers = async (req, res) => {
	try {
		const users = await User.find().select('email role');
		res.status(200).json({
			success: true,
			message: 'Users retrieved successfully',
			data: users,
		});
	} catch (error) {
		console.error('Get all users error:', error);
		res.status(500).json({
			success: false,
			message: 'Cannot retrieve users',
			error: error.message,
		});
	}
};

//Get user profile
export const getUserProfile = async (req, res) => {
	try {
		//1. Get information
		const userId = req.tokenData.userId;

		//2. Find in database

		const user = await User.findOne({ _id: userId }).select(
			'first_name last_name user_name email profilePicture coverPicture about followers following -_id',
		);
		//2. Response
		res.status(200).json({
			success: true,
			message: 'Profile retrived successfully',
			data: user,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: 'Cannot access to profile',
			error: error,
		});
	}
};

//Update User profile
export const updateUserProfile = async (req, res) => {
	try {
		// 1. Get information
		const userId = req.tokenData.userId;
		const {
			first_name,
			last_name,
			user_name,
			email,
			password,
			profilePicture,
			coverPicture,
			about,
		} = req.body;

		// 2. Find in database
		const user = await User.findById(userId);
		if (!user) {
			res.status(404).json({
				success: false,
				message: 'User not found',
			});
			return;
		}

		// 3. Update information
		if (first_name) {
			user.first_name = first_name;
		}
		if (last_name) {
			user.last_name = last_name;
		}
		if (user_name) {
			user.user_name = user_name;
		}
		if (email) {
			user.email = email;
		}
		if (profilePicture) {
			user.profilePicture = profilePicture;
		}
		if (coverPicture) {
			user.coverPicture = coverPicture;
		}
		if (about) {
			user.about = about;
		}

		//4. Process information
		if (password) {
			if (password.length < 8 || password.length > 12) {
				res.status(400).json({
					success: false,
					message: 'Password must be between 8 and 12 characters',
				});
				return;
			}
			user.password = await bcrypt.hash(password, 10);
		}

		//5. Save in database
		await user.save();

		//6. Response
		res.status(200).json({
			success: true,
			message: 'User updated successfully',
			data: user,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: 'Error updating user',
			error: error.message,
		});
	}
};

// Get followers of a user
export const getFollowers = async (req, res) => {
	try {
	  //1. Get information
	  const userId = req.params.id;
  
	  //2. Find in database
	  const user = await User.findById(userId).populate('followers', 'first_name last_name user_name profilePicture');
  
	  //2. Response
	  res.status(200).json({
		success: true,
		message: 'Followers retrieved successfully',
		data: user.followers,
	  });
	} catch (error) {
	  res.status(500).json({
		success: false,
		message: 'Cannot access to followers',
		error: error,
	  });
	}
  };
  
// Follow a User
export const followUser = async (req, res) => {
	const id = req.params.id;

	const { currentUserId } = req.body;

	if (currentUserId === id) {
		res.status(403).json('Action forbidden');
	} else {
		try {
			const followUser = await User.findById(id);
			const followingUser = await User.findById(currentUserId);

			if (!followUser.followers.includes(currentUserId)) {
				await followUser.updateOne({ $push: { followers: currentUserId } });
				await followingUser.updateOne({ $push: { following: id } });
				res.status(200).json('User followed!');
			} else {
				res.status(403).json('User is Already followed by you');
			}
		} catch (error) {
			res.status(500).json(error);
		}
	}
};

// UnFollow a User
export const unfollowUser = async (req, res) => {
	const id = req.params.id;

	const { currentUserId } = req.body;

	if (currentUserId === id) {
		res.status(403).json('Action forbidden');
	} else {
		try {
			const followUser = await User.findById(id);
			const followingUser = await User.findById(currentUserId);
			if (followUser.followers.includes(currentUserId)) {
				await followUser.updateOne({ $pull: { followers: currentUserId } });
				await followingUser.updateOne({ $pull: { following: id } });
				res.status(200).json('User Unfollowed!');
			} else {
				res.status(403).json('User is not followed by you');
			}
		} catch (error) {
			res.status(500).json(error);
		}
	}
};
