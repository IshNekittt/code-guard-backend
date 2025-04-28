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

// Дані для курсі із MonoBank
export const getExchangeRates = async (req, res, next) => {
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
    res.status(500).json({ message: 'Failed to fetch exchange rates from Monobank' });
  }
};


// дані для графіка

export const getChartData = async (req, res) => {
  try {
    const { data } = await axios.get('https://api.monobank.ua/bank/currency');

    if (!Array.isArray(data)) {
      return res.status(500).json({ message: 'Invalid response from Monobank' });
    }

    const filtered = data.filter(
      (item) =>
        (item.currencyCodeA === 840 || item.currencyCodeA === 978) &&
        item.currencyCodeB === 980
    );

    const points = filtered
      .map((item) => {
        const currency = item.currencyCodeA === 840 ? 'USD' : 'EUR';
        const value = item.rateBuy ?? item.rateCross;
        return { currency, value };
      })
      .filter((point) => typeof point.value === 'number' && !isNaN(point.value));

    if (!points.length) {
      return res.status(500).json({ message: 'No valid chart data available' });
    }

    res.status(200).json({ points });
  } catch {
    res.status(500).json({ message: 'Failed to fetch chart data from Monobank' });
  }
};


