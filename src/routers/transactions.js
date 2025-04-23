import { Router } from 'express';
import {authenticate} from "../middlewares/authenticate.js";
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

import { getTransactionsController } from '../controllers/transactions.js';

const router = Router();

router.get('/',authenticate, ctrlWrapper(getTransactionsController));

export default router;