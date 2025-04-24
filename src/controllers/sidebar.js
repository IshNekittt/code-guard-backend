import Balance from "../db/models/balance.js";
import axios from 'axios';

// ✅ Отримання балансу користувача
export const getBalance = async (req, res, next) => {
  try {
    const balanceDoc = await Balance.findOne(); // Пошук документу з балансом
    const amount = balanceDoc?.amount ?? 0;     // Якщо немає — повертаємо 0
    res.status(200).json({ balance: amount });
  } catch (err) {
    next(err);
  }
};

// 🔁 Заглушка на випадок помилки Monobank або dev-режиму
const fallbackRates = {
  USD: { purchase: 27.55, sale: 27.65 },
  EUR: { purchase: 30.0, sale: 30.1 },
};

// ✅ Отримання курсу валют
export const getExchangeRates = async (req, res) => {
  // Якщо в режимі розробки — одразу віддаємо заглушку
  if (process.env.NODE_ENV === 'development') {
    return res.status(200).json(fallbackRates);
  }

  try {
    const { data } = await axios.get('https://api.monobank.ua/bank/currency');

    const filtered = data.filter(
      item =>
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
    console.error('Monobank API error, using fallback:', error.message);
    res.status(200).json(fallbackRates); // У разі помилки — заглушка
  }
};

// ✅ Дані для графіка з Monobank
export const getChartData = async (req, res) => {
  try {
    const { data } = await axios.get('https://api.monobank.ua/bank/currency');

    const filtered = data.filter(
      item =>
        (item.currencyCodeA === 840 || item.currencyCodeA === 978) &&
        item.currencyCodeB === 980
    );

    const result = filtered.map(item => ({
      currency: item.currencyCodeA === 840 ? 'USD' : 'EUR',
      value: item.rateBuy ?? item.rateCross ?? 0,
    }));

    res.status(200).json({ points: result });
  } catch (error) {
    console.error('Failed to fetch chart data from Monobank:', error.message);

    // 🔁 У разі помилки — можна віддати заглушку:
    res.status(200).json({
      points: [
        { currency: 'USD', value: 27.55 },
        { currency: 'EUR', value: 30.0 },
      ],
    });
  }
};


// ✅ Оновлення балансу користувача
export const updateBalance = async (req, res, next) => {
  try {
    const { amount } = req.body;

    if (typeof amount !== 'number') {
      return res.status(400).json({
        message: 'The "amount" field must be a number',
      });
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



