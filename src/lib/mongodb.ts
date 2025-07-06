import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI!;
const client = new MongoClient(uri);

export async function connectToDatabase() {
  try {
    await client.connect();
    return client.db('banking');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
}