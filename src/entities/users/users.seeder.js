import mongoose from 'mongoose';
import User from './users.model.js';
import 'dotenv/config';
import bcrypt from 'bcrypt';

const seedUsers = async () => {
	try {
		await mongoose.connect(process.env.MONGO_URI);
		const users = [
			{
				_id: new mongoose.Types.ObjectId('64e9a6f5f50d0707b1a0c25a'),
				first_name: 'John',
				last_name: 'Doe',
				nickname: 'johnny',
				email: 'john.doe@example.com',
				password: await bcrypt.hash('password123', 10),
				role: 'user',
			},
			{
				_id: new mongoose.Types.ObjectId('64e9a6f5f50d0707b1a0c25b'),
				first_name: 'Jane',
				last_name: 'Smith',
				nickname: 'jane_smith',
				email: 'jane.smith@example.com',
				password: await bcrypt.hash('password123', 10),
				role: 'user',
			},
			{
				_id: new mongoose.Types.ObjectId('64e9a6f5f50d0707b1a0c25c'),
				first_name: 'Alice',
				last_name: 'Johnson',
				nickname: 'alice_j',
				email: 'alice.johnson@example.com',
				password: await bcrypt.hash('password123', 10),
				role: 'user',
			},
			{
				_id: new mongoose.Types.ObjectId('64e9a6f5f50d0707b1a0c25d'),
				first_name: 'Bob',
				last_name: 'Brown',
				nickname: 'bob_brown',
				email: 'bob.brown@example.com',
				password: await bcrypt.hash('password123', 10),
				role: 'user',
			},
			{
				_id: new mongoose.Types.ObjectId('64e9a6f5f50d0707b1a0c25e'),
				first_name: 'Carol',
				last_name: 'Davis',
				nickname: 'carol_d',
				email: 'carol.davis@example.com',
				password: await bcrypt.hash('password123', 10),
				role: 'user',
			},
		];

		await User.create(users);
		console.log('==========================');
		console.log('Users seeder successfully');
        console.log('==========================');
	
	} catch (error) {
		console.log('==========================');
		console.log('ERROR IN USERS SEEDER', error.message);
        console.log('==========================');
	} finally {
		await mongoose.connection.close();
	}
};

export default seedUsers;
