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
		//1. Obtener el id del usuario desde el token decodificado
		const userIdToUpdate = req.tokenData.id;
		const body = req.body;

		//4. Guardar la información en la DB
		const userUpdated = await User.update({ id: userIdToUpdate }, body);

		//5. Responder
		res.status(200).json({
			success: true,
			message: 'User updated successfully',
			data: userUpdated,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: 'User cannot be updated',
			error: error,
		});
	}
};