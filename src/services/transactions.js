import { TransactionsCollection } from '../db/models/transaction.js';

export const getAllTransactions = async (userId) => {
  const transactions = TransactionsCollection.find({ userId });

  return {
    data: transactions,
  };
};
