import { Router } from 'express';
import {authenticate} from "../middlewares/authenticate.js";
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { getStatisticsController } from '../controllers/statistics.js';
import { getTransactionsController } from '../controllers/transactions.js';

const router = Router();

router.get('/',authenticate, ctrlWrapper(getTransactionsController));
router.get('/filter/by-date',authenticate, ctrlWrapper(getStatisticsController));
export default router;