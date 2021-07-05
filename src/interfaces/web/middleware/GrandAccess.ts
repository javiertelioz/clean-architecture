import { Request, Response, NextFunction, RequestHandler } from 'express';

import HttpException from '../exceptions/HttpException';

import RoleManager from '../../../infrastructure/security/RoleManager';

export interface RequestCustom extends Request {
  user: any;
}

export default function grantAccessMiddleware(action: string, resource: string): RequestHandler {
  return async (req: RequestCustom, res: Response, next: NextFunction) => {
    try {
      const permission = RoleManager.can(req.user.role)[action](resource);
      if (!permission.granted) {
        throw new HttpException(403, "You don't have enough permission to perform this action");
      }

      next();
    } catch (error) {
      next(new HttpException(401, error.message));
    }
  };
}
