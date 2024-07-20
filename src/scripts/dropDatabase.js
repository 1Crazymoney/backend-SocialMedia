import mongoose from 'mongoose';
import { dbConnection } from '../database/db.js'
import 'dotenv/config';

const dropDatabase = async () => {
  await dbConnection();
  try {
    await mongoose.connection.db.dropDatabase();
    console.log('==========================');
    console.log('Database dropped successfully');
    console.log('==========================');
  } catch (error) {
    console.log('==========================');
    console.error('Error dropping database:', error);
    console.log('==========================');
  } finally {
    await mongoose.connection.close();
  }
};

dropDatabase();