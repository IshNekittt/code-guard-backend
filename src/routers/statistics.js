import { Router } from 'express';
import {authenticate} from "../middlewares/authenticate.js";
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

import { getStatisticsController } from '../controllers/statistics.js';

const router = Router();

router.get('/filter/by-date',authenticate, ctrlWrapper(getStatisticsController));

export default router;