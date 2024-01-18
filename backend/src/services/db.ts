import mongoose from 'mongoose';
import { DB_USER_NAME, DB_USER_PASSWORD } from '~/config';

export const connectToDatabase = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${DB_USER_NAME}:${DB_USER_PASSWORD}@cluster0.ap4lh.mongodb.net/?retryWrites=true&w=majority`
    );

    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
};
