import mongoose from 'mongoose';
import { env } from '../utils/env.js';
import { MONGO_VARS } from '../constants/constans.js';

export const initMongoConnection = async () => {
  try {
    const user = env(MONGO_VARS.MONGODB_USER);
    const password = env(MONGO_VARS.MONGODB_PASSWORD);
    const url = env(MONGO_VARS.MONGODB_URL);
    const db = env(MONGO_VARS.MONGODB_DB, '');
    await mongoose.connect(
      `mongodb+srv://${user}:${password}@${url}/${db}?retryWrites=true&w=majority&appName=Cluster0`,
    );
  } catch (error) {
    console.log(error);
  }
};
