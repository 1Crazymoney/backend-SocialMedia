import mongoose from 'mongoose';
import Post from './posts.model.js';

const seedPosts = async () => {
    try {
      await mongoose.connect(process.env.MONGO_URI);
  
      const userIds = [
        new mongoose.Types.ObjectId('64e9a6f5f50d0707b1a0c25a'),
        new mongoose.Types.ObjectId('64e9a6f5f50d0707b1a0c25b'),
        new mongoose.Types.ObjectId('64e9a6f5f50d0707b1a0c25c'),
        new mongoose.Types.ObjectId('64e9a6f5f50d0707b1a0c25d'),
        new mongoose.Types.ObjectId('64e9a6f5f50d0707b1a0c25e'),
      ];
  
      const posts = [
        {
          description: 'Excited for the new season of my favorite show!',
          image: 'https://example.com/image1.jpg',
          user: userIds[0],
          likes: [userIds[1], userIds[2]],
        },
        {
          description: 'Enjoying a peaceful evening at home.',
          image: '',
          user: userIds[0],
          likes: [userIds[2]],
        },
        {
          description: 'Had a fantastic workout this morning.',
          image: 'https://example.com/image2.jpg',
          user: userIds[0],
          likes: [userIds[3]],
        },
        {
          description: 'Just got a promotion at work!',
          image: '',
          user: userIds[1],
          likes: [userIds[0], userIds[4]],
        },
        {
          description: 'Trying out a new restaurant tonight.',
          image: 'https://example.com/image3.jpg',
          user: userIds[1],
          likes: [userIds[4]],
        },
        {
          description: 'Feeling very productive today.',
          image: '',
          user: userIds[1],
          likes: [userIds[0]],
        },
        {
          description: 'New blog post up on my site.',
          image: 'https://example.com/image4.jpg',
          user: userIds[2],
          likes: [userIds[1], userIds[4]],
        },
        {
          description: 'Had a great chat with an old friend.',
          image: '',
          user: userIds[2],
          likes: [userIds[3]],
        },
        {
          description: 'Planning for the next vacation.',
          image: 'https://example.com/image5.jpg',
          user: userIds[2],
          likes: [userIds[4]],
        },
        {
          description: 'Just finished a challenging project.',
          image: '',
          user: userIds[3],
          likes: [userIds[0]],
        },
        {
          description: 'Relaxing with a good book.',
          image: 'https://example.com/image6.jpg',
          user: userIds[3],
          likes: [userIds[2]],
        },
        {
          description: 'Had a wonderful day out in nature.',
          image: '',
          user: userIds[3],
          likes: [userIds[1]],
        },
        {
          description: 'Excited for the new season of my favorite show.',
          image: 'https://example.com/image7.jpg',
          user: userIds[4],
          likes: [userIds[0]],
        },
        {
          description: 'Enjoying a peaceful evening at home.',
          image: '',
          user: userIds[4],
          likes: [userIds[2]],
        },
        {
          description: 'Just got back from a fantastic conference.',
          image: 'https://example.com/image8.jpg',
          user: userIds[4],
          likes: [userIds[3]],
        },
      ];
  
      await Post.create(posts);
      console.log('==========================');
      console.log('Post seeder successfully');
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