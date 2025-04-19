import express from 'express';
import {
  getBalance,
  getExchangeRates,
  getChartData,
  updateBalance
} from '../controllers/sidebar.js';

const router = express.Router();

router.get('/balance', getBalance);
router.patch('/balance', updateBalance);
router.get('/exchange-rates', getExchangeRates);
router.get('/chart', getChartData);

export default router;
