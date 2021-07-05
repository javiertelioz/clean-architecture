import { Request, Response, NextFunction, RequestHandler } from 'express';

export interface RequestCustom extends Request {
  filters: [];
  pagination: {
    limit: number;
    offset: number;
  };
}

function paginationMiddleware(request: RequestCustom, response: Response, next: NextFunction) {
  const { page, limit } = request.query;

  request.pagination = {
    limit: +limit,
    offset: (+page - 1) * +limit
  };

  next();
}

export default paginationMiddleware;
