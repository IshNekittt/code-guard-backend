import { TransactionsCollection } from '../db/models/transaction.js';

export const getAllTransactions = async (userId) => {
  const transactions = await TransactionsCollection.find({ userId });

  return {
    data: transactions,
  };
};