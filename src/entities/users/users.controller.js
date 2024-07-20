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
			'first_name last_name nickname email -_id',
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
		const { first_name, last_name, nickname, email, password } = req.body;

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
		if (nickname) {
			user.nickname = nickname;
		}
		if (email) {
			user.email = email;
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
