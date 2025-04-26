import { TransactionsCollection } from '../db/models/transaction.js';

export const getAllTransactions = async (userId) => {
  const transactions = await TransactionsCollection.find({ userId });

  return {
    data: transactions,
  };
};

export const postTransaction = async (payload, userId) => {
  return await TransactionsCollection.create({ ...payload, userId });
};

export const patchTransaction = async (id, payload, userId) => {
  const rawResult = await TransactionsCollection.findOneAndUpdate(
    { _id: id, userId },
    payload,
    {
      new: true,
      includeResultMetadata: true,
    },
  );

  if (!rawResult || !rawResult.value) return null;

  return {
    transaction: rawResult.value,
  };
};

export const deleteTransaction = (id, userId) => {
  return TransactionsCollection.findOneAndDelete({ _id: id, userId });
};
