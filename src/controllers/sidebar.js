import axios from 'axios';
import { UsersCollection } from '../db/models/user.js';


// Баланс користувача з моделі User
export const getBalance = async (req, res, next) => {
  try {
    const userId = req.user?.id; // Перевірка авторизації
    const user = await UsersCollection.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ balance: user.balance ?? 0 });
  } catch (error) {
    next(error);
  }
};

// Курс валют
export const getExchangeRates = async (req, res) => {
  try {
    const { data } = await axios.get('https://api.monobank.ua/bank/currency');

    const filtered = data.filter(
      (item) =>
        (item.currencyCodeA === 840 || item.currencyCodeA === 978) &&
        item.currencyCodeB === 980 &&
        (item.rateBuy || item.rateSell || item.rateCross)
    );

    if (!filtered.length) {
      return res.status(404).json({ message: 'No exchange rates found' });
    }

    const result = {};
    for (const item of filtered) {
      const currency = item.currencyCodeA === 840 ? 'USD' : 'EUR';
      result[currency] = {
        purchase: typeof item.rateBuy === 'number' ? item.rateBuy : item.rateCross,
        sale: typeof item.rateSell === 'number' ? item.rateSell : item.rateCross,
      };
    }

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch exchange rates from Monobank' });
  }
};

// Дані для графіка

export const getChartData = async (req, res) => {
  try {
    const { data } = await axios.get('https://api.monobank.ua/bank/currency');

    if (!Array.isArray(data)) {
      return res.status(200).json({ points: [] });
    }

    const filtered = data.filter(
      (item) =>
        (item.currencyCodeA === 840 || item.currencyCodeA === 978) &&
        item.currencyCodeB === 980 &&
        (typeof item.rateBuy === 'number' || typeof item.rateCross === 'number')
    );

    const points = filtered.map((item) => {
      const currency = item.currencyCodeA === 840 ? 'USD' : 'EUR';
      const value = typeof item.rateBuy === 'number' ? item.rateBuy : item.rateCross;
      return { currency, value };
    });


    res.status(200).json({ points: points.length ? points : [] });
  } catch (error) {
    res.status(200).json({ points: [] });
  }
};

