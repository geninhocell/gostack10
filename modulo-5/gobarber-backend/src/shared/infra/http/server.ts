import 'reflect-metadata';
import 'dotenv/config';

import express, { NextFunction, Response, Request } from 'express';
import 'express-async-errors';
import { errors } from 'celebrate';
import cors from 'cors';
import storageConfig from '@config/storage';
import AppError from '@shared/errors/AppError';
import rateLimiter from '@shared/infra/http/middlewares/rateLimiter';
import routes from './routes';

import '@shared/infra/typeorm';
import '@shared/container';

const app = express();

app.use(rateLimiter);
app.use(cors());
app.use(express.json());
app.use('/files', express.static(storageConfig.uploadsFolder));
app.use(routes);

app.use(errors());

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response
      .status(err.statusCode)
      .json({ status: 'error', message: err.message });
  }

  // eslint-disable-next-line no-console
  console.error(err);

  return response
    .status(500)
    .json({ status: 'error', message: 'Internal server error' });
});

const port = 3333;

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server started on port ${port}`);
});
