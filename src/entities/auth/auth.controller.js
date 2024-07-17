import dotenv from 'dotenv';
dotenv.config();

import bcrypt from 'bcrypt';
import User from '../users/users.model.js';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
	try {
		const { email, password } = req.body;

		const saltRounds = parseInt(process.env.SALT_ROUNDS);
		const hashedPassword = await bcrypt.hash(password, saltRounds);

		const newUser = await User.create({
			email: email,
			password: hashedPassword,
		});

		res.status(200).json({
			success: true,
			message: 'User registered successfully',
			data: newUser,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: 'Error registering user',
			error: error.message,
		});
	}
};

export const login = async (req, res) => {
	try {
		const { email, password } = req.body;

		if (!email || !password) {
			return res.status(400).json({
				success: false,
				message: 'Email and password are required',
			});
		}

		const user = await User.findOne({ email });

		if (!user) {
			console.log('User not found');
			return res.status(404).json({
				success: false,
				message: 'User or password invalid',
			});
		}

		const isPasswordValid = await bcrypt.compare(password, user.password);

		if (!isPasswordValid) {
			console.log('Invalid password');
			return res.status(404).json({
				success: false,
				message: 'User or password invalid',
			});
		}

		const token = jwt.sign(
			{
				userId: user._id,
				email: user.email,
				role: user.role,
			},
			process.env.JWT_SECRET,
			{
				expiresIn: '2h',
			},
		);
		res.status(200).json({
			success: true,
			message: 'User logged successfully',
			data: token,
		});
	} catch (error) {

		res.status(500).json({
			success: false,
			message: 'Error login user',
			error: error.message,
		});
	}
};
