import { Router } from 'express';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { authenticate } from '../middlewares/authenticate.js';

import { getTransactionsController } from '../controllers/transactions.js';

const router = Router();

router.use(authenticate);

router.get('/', ctrlWrapper(getTransactionsController));

export default router;
