import axios from 'axios';

// 🔁 Заглушка на випадок помилки Monobank або dev-режиму
const fallbackRates = {
  USD: { purchase: 27.55, sale: 27.65 },
  EUR: { purchase: 30.0, sale: 30.1 },
};

// ✅ Отримання курсу валют
export const getExchangeRates = async (req, res) => {
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
    res.status(200).json(fallbackRates);
  }
};

// ✅ Дані для графіка
export const getChartData = (req, res) => {
  res.status(200).json({
    points: [
      { currency: 'USD', value: 27.55 },
      { currency: 'EUR', value: 30.0 },
    ],
  });
};
