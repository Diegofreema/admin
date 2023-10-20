import mongoose from 'mongoose';

let isConnected = false;

export const connectToDB = async () => {
  mongoose.set('strictQuery', true);

  if (!process.env.DATABASE_URL) return console.log('No database url');
  if (isConnected) return console.log('Already connected');

  try {
    await mongoose.connect(process.env.DATABASE_URL);
    isConnected = true;
  } catch (error) {
    console.log(error);
  }
};
