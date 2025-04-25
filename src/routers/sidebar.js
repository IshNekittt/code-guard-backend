import express from 'express';
import {
  getExchangeRates,
  getChartData,
  getBalance,
} from '../controllers/sidebar.js';
import { authenticate } from '../middlewares/authenticate.js';

const router = express.Router();


router.get('/balance', authenticate, getBalance);
router.get('/exchange-rates', getExchangeRates);
router.get('/chart', getChartData);

export default router;
