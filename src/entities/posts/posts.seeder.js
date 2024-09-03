import mongoose from 'mongoose';
import Post from './posts.model.js';

const seedPosts = async () => {
	try {
		await mongoose.connect(process.env.MONGO_URI);

		const userIds = [
			new mongoose.Types.ObjectId('66d60de89adde2aa278340c3'), // John Doe
			new mongoose.Types.ObjectId('66d60de89adde2aa278340c1'), // Jane Doe
			new mongoose.Types.ObjectId('66d60de89adde2aa278340c5'), // Bob Smith
			new mongoose.Types.ObjectId('66d60de89adde2aa278340cb'), // Alice Johnson
		];

		const posts = [
			{
				description: 'Hello world!',
				image: 'https://i.postimg.cc/ZnHXKhj4/closeup-shot-airplane-wing-mountains.jpg',
				user: userIds[0], // John Doe
			},
			{
				description: 'I love coffee!',
				image: 'https://i.postimg.cc/zXD92VXB/cup-coffee-with-heart-drawn-foam.jpg',
				user: userIds[0], // John Doe
			},
			{
				description: 'Just finished reading a great book!',
				image: 'https://i.postimg.cc/9XY6BG2K/crop-woman-enjoying-reading-near-window.jpg',
				user: userIds[1], // Jane Doe
			},
			{
				description: 'New design project!',
				image: 'https://i.postimg.cc/sXynBNMX/still-life-graphic-design-studio.jpg',
				user: userIds[2], // Bob Smith
			},
			{
				description: 'Just got back from an amazing trip',
				image: 'https://i.postimg.cc/fTH1GDJv/female-tourist-balcony-from.jpg',
				user: userIds[3], // Alice Johnson
			},
			{
				description: 'Check out my new profile picture!',
				image: 'https://i.postimg.cc/1XmYdjST/pikaso-texttoimage-35mm-film-photography-Fotopara-usar-como-foto-de-p.jpg',
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
