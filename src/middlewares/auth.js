import jwt from 'jsonwebtoken';
import User from '../entities/users/users.model.js';

export const auth = async (req, res, next) => {
	try {
		const token = req.headers.authorization?.split(' ')[1];

		if (!token) {
			return res.status(401).json({
				success: false,
				message: 'Unauthorized access',
			});
		}

		const decoded = jwt.verify(token, process.env.JWT_SECRET);

		req.tokenData = {
			userId: decoded.userId,
			role: decoded.role,
		};
		next();
	} catch (error) {
		return res.status(401).json({
			success: false,
			message: 'Unauthorized',
			error: error.message,
		});
	}
};
