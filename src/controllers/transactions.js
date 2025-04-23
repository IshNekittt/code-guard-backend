import { getAllTransactions } from '../services/transactions.js';

export const getTransactionsController = async (req, res) => {
  const userId = req.user._id;

  const data = await getAllTransactions(userId);

  res.status(200).json({
    status: 200,
    message: 'Successfully found transactions!',
    data,
  });
};