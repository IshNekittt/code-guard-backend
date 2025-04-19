import express from 'express';

import authRouter from './auth.js';
import transactionsRouter from './transactions.js';

// import { swaggerConfig } from '../middlewares/swaggerConfig.js';

const router = express.Router();

// router.use('/api-docs', await swaggerConfig());
router.use('/auth', authRouter);
router.use('/transactions', transactionsRouter);

export default router;
