import { Router } from 'express';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';

import { getTransactionsController } from '../controllers/transactions.js';

const router = Router();

router.get('/', ctrlWrapper(getTransactionsController));

export default router;
