import User from "./users.model.js";

//Get all users
export const getAllUsers = async (req, res) => {
	try {
		//1. Obtener información
		const users = await User.find({
			select: {
				email: true,
			},
		});

		//2. Responder
		res.status(200).json({
			success: true,
			message: 'Users retrived successfully',
			data: users,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: 'Cannot show all users',
			error: error,
		});
	}
};

//Get user profile
export const getUserProfile = async (req, res) => {
	try {
		//1. Obtener información
		const userId = req.tokenData.id;

		//2. Bucarlo en DB

		const user = await User.findOne({
			where: { id: userId },
		});
		//2. Responder
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
		// 1. Get info
		const userIdToUpdate = req.tokenData.id;
		const { first_name, last_name, email, password_hash } = req.body;
		let newPassword;
		// 2. Validate information
		const user = await User.findOne({
		  where: {
			id: userIdToUpdate,
		  },
		});
		if (!user) {
		  return res.status(404).json({
			success: false,
			message: 'User not found',
		  });
		}
		// 3. Process information
		if (password_hash) {
		  if (password_hash.length < 8 || password_hash.length > 12) {
			return res.status(400).json({
			  success: false,
			  message:
				'Password is not valid, 8 to 12 characters must be needed, try again',
			});
		  }
		  newPassword = bcrypt.hashSync(password_hash, 10);
		}
		// 4. Save in database
		const updatedFields = {
		  first_name: first_name,
		  last_name: last_name,
		  email: email,
		  password_hash: newPassword,
		};
		await User.update(
		  {
			id: userIdToUpdate,
		  },
		  updatedFields,
		);
		// 5. Response
		res.status(200).json({
		  success: true,
		  message: 'User updated successfully',
		  data: updatedFields,
		});
	  } catch (error) {
		res.status(500).json({
		  success: false,
		  message: 'User cannot be updated',
		  error: error,
		});
	  }
	};