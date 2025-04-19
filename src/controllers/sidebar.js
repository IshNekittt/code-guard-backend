import Balance from "../db/models/balance.js";

export const getBalance = async (req, res, next) => {
  try {
    const balanceDoc = await Balance.findOne();


    const amount = balanceDoc?.amount ?? 0;

    res.status(200).json({ balance: amount });
  } catch (err) {
    next(err);
  }
};

import axios from 'axios';

export const getExchangeRates = async (req, res) => {
  try {
    const { data } = await axios.get('https://api.monobank.ua/bank/currency');


    const filtered = data.filter(
      (item) =>
        (item.currencyCodeA === 840 || item.currencyCodeA === 978) &&
        item.currencyCodeB === 980
    );

    const result = {};
    for (const item of filtered) {
      const currency = item.currencyCodeA === 840 ? 'USD' : 'EUR';
      result[currency] = {
        purchase: item.rateBuy ?? item.rateCross ?? null,
        sale: item.rateSell ?? item.rateCross ?? null,
      };
    }

    res.status(200).json(result);
  } catch (error) {
    console.error('Monobank API error:', error.message);
    res.status(500).json({ message: 'Failed to fetch rates from Monobank' });
  }
};


export const getChartData = (req, res) => {
  res.json({
    points: [
      { currency: 'USD', value: 27.55 },
      { currency: 'EUR', value: 30.0 },
    ],
  });
};


export const updateBalance = async (req, res, next) => {
  try {
    const { amount } = req.body;

    if (typeof amount !== 'number') {
      return res.status(400).json({ message: 'The "amount" field must be a number' });
    }

    let balanceDoc = await Balance.findOne();

    if (balanceDoc) {
      balanceDoc.amount = amount;
      await balanceDoc.save();
    } else {
      balanceDoc = await Balance.create({ amount });
    }

    res.status(200).json({ balance: balanceDoc.amount });
  } catch (error) {
    next(error);
  }
};
