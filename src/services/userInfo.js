import createHttpError from 'http-errors';
import { UsersCollection } from '../db/models/user.js';

export const getUserInfo = async (userId) => {
  const userInfo = await UsersCollection.findById(userId);
  if (!userInfo) throw createHttpError(401, 'User not found');
  return userInfo;
};
