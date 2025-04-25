import { Router } from 'express';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { authenticate } from '../middlewares/authenticate.js';

import { getUserInfoController } from '../controllers/userInfo.js';

const router = Router();

router.use(authenticate);

router.get('/currentUser', ctrlWrapper(getUserInfoController));

export default router;
