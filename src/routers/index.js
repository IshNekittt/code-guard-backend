import express from 'express';

import authRouter from './auth.js';

// import { swaggerConfig } from '../middlewares/swaggerConfig.js';

const router = express.Router();

// router.use('/api-docs', await swaggerConfig());
router.use('/auth', authRouter);

export default router;
