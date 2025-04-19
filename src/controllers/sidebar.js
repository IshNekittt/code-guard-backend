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

export const getExchangeRates = (req, res) => {
  res.json({
    USD: { purchase: 27.55, sale: 27.65 },
    EUR: { purchase: 30.0, sale: 30.1 },
  });
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
