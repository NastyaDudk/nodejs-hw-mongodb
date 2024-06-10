import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { ENV_VARS } from './constants/index.js';
import { env } from './utils/env.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { router } from './routers/contacts.js';

export const setupServer = () => {
  const app = express();

  app.set('etag', false);

  app.use(express.json());
  app.use(cors());

  app.get('/', (req, res) => {
    res.send('Hello. Very hard HomeWork...😩');
  });

  app.use(router);

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.use(notFoundHandler);

  app.use(errorHandler);

  const PORT = env(ENV_VARS.PORT, 3000);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
