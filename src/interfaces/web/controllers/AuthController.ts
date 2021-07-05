import httpStatus from 'http-status';
import { Request, Response, NextFunction } from 'express';

import HttpException from '../exceptions/HttpException';

import LoginSerializer from '../serializers/auth/LoginSerializer';

import BcryptManager from '../../../infrastructure/security/BcryptManager';
import JwtAccessTokenManager from '../../../infrastructure/security/JwtAccessTokenManager';

import GetAuthorization from '../../../application/use_cases/auth/GetAuthorization';

// import UserRepositorySQL from "../../../infrastructure/repositories/user/UserRepositorySQL";
import UserRepositoryMongo from '../../../infrastructure/repositories/user/UserRepositoryMongo';

export default class UserController {
  async getAuthorization(req: Request, res: Response, next: NextFunction): Promise<any> {
    const { body } = req;

    try {
      const token = await GetAuthorization(
        body,
        new UserRepositoryMongo(),
        new JwtAccessTokenManager(),
        new BcryptManager()
      );

      return res.status(httpStatus.OK).send(LoginSerializer.getInstance().serialize(token));
    } catch (error) {
      next(new HttpException(httpStatus.BAD_REQUEST, error.message));
    }
  }
}
