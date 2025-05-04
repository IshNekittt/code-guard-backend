import { TransactionsCollection } from '../db/models/transaction.js';

export const getStatisticsSercices = async (userId, start) => {
 
  const [year, month] = start.split("-").map(Number);

  const startDate = new Date(year, month, 1);
  const endDate = new Date(year, month +1,0);
 
  const transactions = await TransactionsCollection.find({
    userId,
    date: {
      $gte: startDate,
      $lte: endDate,
    },
  });
  return {
    data: transactions,
  };
};