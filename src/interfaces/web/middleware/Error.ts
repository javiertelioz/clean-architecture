import { Request, Response, NextFunction } from 'express';

import Logger from '../../../infrastructure/logger';
import HttpException from '../exceptions/HttpException';

function errorMiddleware(error: HttpException, request: Request, response: Response, next: NextFunction) {
  const status = error.status || 500;
  const message = error.message || 'Something went wrong';
  const errors = error.errors || null;

  Logger.error(error.message, error.stack);

  response.status(status).send({ message, errors });
}

export default errorMiddleware;
