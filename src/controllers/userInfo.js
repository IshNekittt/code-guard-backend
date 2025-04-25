import { getUserInfo } from '../services/userInfo.js';

export const getUserInfoController = async (req, res) => {
  const userId = req.user._id;

  const data = await getUserInfo(userId);

  res.status(200).json({
    status: 200,
    message: 'Successfully found user!',
    data,
  });
};
