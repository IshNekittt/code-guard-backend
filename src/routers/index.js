import express from 'express';

import authRouter from './auth.js';
import transactionsRouter from './transactions.js';
import usersRouter from './users.js';

// import { swaggerConfig } from '../middlewares/swaggerConfig.js';

const router = express.Router();

// router.use('/api-docs', await swaggerConfig());
router.use('/auth', authRouter);
router.use('/transactions', transactionsRouter);
router.use('/users', usersRouter);

export default router;
