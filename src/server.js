import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

import { getEnvVar } from './utils/getEnvVar.js';
import indexRouter from './routers/index.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import sidebarRoutes from './routers/sidebar.js';
import { swaggerConfig } from './middlewares/swaggerConfig.js';

dotenv.config();

export async function setupServer() {
  const PORT = Number(getEnvVar('PORT', '3000'));
  const app = express();

  const swagger = await swaggerConfig();
  app.use('/api-docs', ...swagger);

  const allowedOrigins = [
    'http://localhost:3000',
    'http://localhost:5173',
    'https://code-guard-frontend.vercel.app',
  ];

  app.use(
    cors({
      origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true);
        } else {
          callback(new Error('Not allowed by CORS'));
        }
      },
      credentials: true,
    }),
  );

  app.use(express.json());
  app.use(cookieParser());

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.use(indexRouter);
  app.use('/sidebar', sidebarRoutes);

  app.use(notFoundHandler);
  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
    console.log(
      `📚 Swagger docs available at http://localhost:${PORT}/api-docs`,
    );
  });
}
