import { Router } from 'express';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../../../nodejs-hw-mongodb/src/middlewares/validateBody.js';

import { authenticate } from '../middlewares/authenticate.js';
import { isValidId } from '../../../nodejs-hw-mongodb/src/middlewares/isValidId.js';

import {
  createTransactionController,
  deleteTransactionController,
  getTransactionsController,
  patchTransactionController,
} from '../controllers/transactions.js';

import {
  createTransactionSchema,
  patchTransactionSchema,
} from '../validation/transactions.js';

const router = Router();

router.use(authenticate);

router.get('/', ctrlWrapper(getTransactionsController));

router.post(
  '/',
  validateBody(createTransactionSchema),
  ctrlWrapper(createTransactionController),
);

router.patch(
  '/:transactionId',
  isValidId,
  validateBody(patchTransactionSchema),
  ctrlWrapper(patchTransactionController),
);

router.delete(
  '/:transactionId',
  isValidId,
  ctrlWrapper(deleteTransactionController),
);

export default router;
