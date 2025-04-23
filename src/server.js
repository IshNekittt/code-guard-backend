import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

//import { getEnvVar } from './utils/getEnvVar.js';

import indexRouter from './routers/index.js';

import { errorHandler } from './middlewares/errorHandler.js';
//import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { getEnvVar } from './utils/getEnvVar.js';
import { swaggerConfig } from './middlewares/swaggerConfig.js';

dotenv.config();

export async function setupServer() {
 
  //const PORT = process.env.PORT || 3000;
   const PORT = Number(getEnvVar('PORT', '3000'));
  const app = express();
  const swagger = await swaggerConfig();
    app.use('/api-docs', ...swagger);
  app.use(cors());
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

  // app.use(notFoundHandler);

  app.use(errorHandler);

   app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
    console.log(`📚 Swagger docs available at http://localhost:${PORT}/api-docs`);
  });
}
