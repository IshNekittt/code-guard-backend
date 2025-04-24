import express from 'express';
import {
  getBalance,
  getExchangeRates,
  getChartData,
} from '../controllers/sidebar.js';

const router = express.Router();

router.get('/balance', getBalance);
router.get('/exchange-rates', getExchangeRates);
router.get('/chart', getChartData);

export default router;

