import mongoose from 'mongoose';
import { dbConnection } from '../database/db.js';
import seedUsers from '../entities/users/users.seeder.js';
import seedPosts from '../entities/posts/posts.seeder.js'
import 'dotenv/config';

const seedDatabase = async () => {
  await dbConnection();

  try {
    await seedUsers();
    await seedPosts();
  } catch (error) {
  } finally {
    await mongoose.connection.close();
  }
};

seedDatabase();
