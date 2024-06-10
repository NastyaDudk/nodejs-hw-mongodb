import { env } from '../utils/env.js';
import mongoose from 'mongoose';
import { ENV_VARS } from '../constants/index.js';

export const initMongoConnection = async () => {
  try {
    const user = env(ENV_VARS.MONGODB_USER);
    const pwd = env(ENV_VARS.MONGODB_PASSWORD);
    const url = env(ENV_VARS.MONGODB_URL);
    const db = env(ENV_VARS.MONGODB_DB);

    const connectionLink = `mongodb+srv://${user}:${pwd}@${url}/${db}?retryWrites=true&w=majority`;
    await mongoose.connect(connectionLink);
    console.log('Mongo connection successfully established!');
  } catch (err) {
    console.log(
      'MongoDB connection error. Please make sure MongoDB is running.',
    );
    throw new Error(err);
  }
};
