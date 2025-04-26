import express from 'express';

import authRouter from './auth.js';
import transactionsRouter from './transactions.js';
import usersRouter from './users.js';

import { EXPENSE_CATEGORIES, INCOME_CATEGORIES } from '../constants/index.js';

// import { swaggerConfig } from '../middlewares/swaggerConfig.js';

const router = express.Router();

// router.use('/api-docs', await swaggerConfig());
router.use('/auth', authRouter);
router.use('/transactions', transactionsRouter);
router.use('/users', usersRouter);
router.get('/categories', (_req, res) => {
  res.json({
    status: 200,
    message: 'Successfully found categories',
    data: {
      incomeCategories: INCOME_CATEGORIES,
      expenseCategories: EXPENSE_CATEGORIES,
    },
  });
});

export default router;
