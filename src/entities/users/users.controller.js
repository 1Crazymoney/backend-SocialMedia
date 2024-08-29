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

// Get user profile
export const getUserProfile = async (req, res) => {
	try {
		const userId = req.tokenData.userId;
		const user = await User.findOne({ _id: userId }).select(
			'first_name last_name user_name email profilePicture coverPicture about followers following -_id',
		);

		if (!user) {
			return res.status(404).json({
				success: false,
				message: 'User not found',
			});
		}

		res.status(200).json({
			success: true,
			message: 'Profile retrieved successfully',
			data: user,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: 'Cannot access profile',
			error: error.message,
		});
	}
};

// Update User profile
export const updateUserProfile = async (req, res) => {
	try {
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

		const user = await User.findById(userId);
		if (!user) {
			return res.status(404).json({
				success: false,
				message: 'User not found',
			});
		}

		// Update fields if provided
		if (first_name) user.first_name = first_name;
		if (last_name) user.last_name = last_name;
		if (user_name) user.user_name = user_name;
		if (email) user.email = email;
		if (profilePicture) user.profilePicture = profilePicture;
		if (coverPicture) user.coverPicture = coverPicture;
		if (about) user.about = about;

		if (password) {
			if (password.length < 8 || password.length > 12) {
				return res.status(400).json({
					success: false,
					message: 'Password must be between 8 and 12 characters',
				});
			}
			user.password = await bcrypt.hash(password, 10);
		}

		await user.save();

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
		const currentUserId = req.tokenData.userId;

		const user = await User.findById(currentUserId).populate(
			'followers',
			'first_name last_name user_name profilePicture',
		);

		if (!user) {
			return res.status(404).json({
				success: false,
				message: 'User not found',
			});
		}

		res.status(200).json({
			success: true,
			message: 'Followers retrieved successfully',
			data: user.followers,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: 'Cannot access followers',
			error: error.message,
		});
	}
};

// Follow a User
export const followUser = async (req, res) => {
	const idToFollow = req.params.id;
	const currentUserId = req.tokenData.userId;

	if (currentUserId === idToFollow) {
		res.status(403).json('Action forbidden');
	} else {
		try {
			const userToFollow = await User.findById(idToFollow);
			const currentUser = await User.findById(currentUserId);

			if (!userToFollow.followers.includes(currentUserId)) {
				await userToFollow.updateOne({ $push: { followers: currentUserId } });
				await currentUser.updateOne({ $push: { following: idToFollow } });
				res.status(200).json('User followed!');
			} else {
				res.status(403).json('User is already followed by you');
			}
		} catch (error) {
			res.status(500).json(error);
		}
	}
};

// Unfollow a User
export const unfollowUser = async (req, res) => {
	const idToUnfollow = req.params.id;
	const currentUserId = req.tokenData.userId;

	if (currentUserId === idToUnfollow) {
		res.status(403).json('Action forbidden');
	} else {
		try {
			const userToUnfollow = await User.findById(idToUnfollow);
			const currentUser = await User.findById(currentUserId);

			if (userToUnfollow.followers.includes(currentUserId)) {
				await userToUnfollow.updateOne({ $pull: { followers: currentUserId } });
				await currentUser.updateOne({ $pull: { following: idToUnfollow } });
				res.status(200).json('User unfollowed!');
			} else {
				res.status(403).json('User is not followed by you');
			}
		} catch (error) {
			res.status(500).json(error);
		}
	}
};
