import mongoose from 'mongoose';
import Post from './posts.model.js';

const seedPosts = async () => {
	try {
		await mongoose.connect(process.env.MONGO_URI);

		const userIds = [
			new mongoose.Types.ObjectId('64e9a6f5f50d0707b1a0c25a'), // John Doe
			new mongoose.Types.ObjectId('64e9a6f5f50d0707b1a0c25b'), // Jane Doe
			new mongoose.Types.ObjectId('64e9a6f5f50d0707b1a0c25c'), // Bob Smith
			new mongoose.Types.ObjectId('64e9a6f5f50d0707b1a0c25d'), // Alice Johnson
			new mongoose.Types.ObjectId('64e9a6f5f50d0707b1a0c25e'),
		];

		const posts = [
			{
				description: 'Hello world!',
				image: 'https://freeimage.host/i/dXvBeyl',
				user: userIds[0], // John Doe
			},
			{
				description: 'I love coffee!',
				image: 'https://freeimage.host/i/dXvBgn9',
				user: userIds[0], // John Doe
			},
			{
				description: 'Just got back from an amazing trip!',
				image: 'https://freeimage.host/i/dXvBNaf',
				user: userIds[1], // Jane Doe
			},
			{
				description: 'New design project!',
				image: 'https://freeimage.host/i/dXvB46u',
				user: userIds[2], // Bob Smith
			},
			{
				description: 'Just finished reading a great book!',
				image: 'https://freeimage.host/i/dXvBvu2',
				user: userIds[3], // Alice Johnson
			},
			{
				description: 'Check out my new profile picture!',
				image: 'https://freeimage.host/i/dXOq73l',
				user: userIds[3], // Alice Johnson
			},
		];

		await Post.create(posts);
		console.log('==========================');
		console.log('Post seeder ran successfully');
		console.log('==========================');
	} catch (error) {
		console.log('==========================');
		console.log('ERROR IN POSTS SEEDER', error.message);
		console.log('==========================');
	} finally {
		await mongoose.connection.close();
	}
};

export default seedPosts;
