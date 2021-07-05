import httpStatus from 'http-status';
import { Request, Response, NextFunction } from 'express';

import HttpException from '../exceptions/HttpException';

import BcryptManager from '../../../infrastructure/security/BcryptManager';

import UserSerializer from '../serializers/user/UserSerializer';
import { Pagination, Paginate } from '../Pagination';

import GetUser from '../../../application/use_cases/user/GetUser';
import CreateUser from '../../../application/use_cases/user/CreateUser';
import GetAllUsers from '../../../application/use_cases/user/GetAllUsers';
import RemoveUser from '../../../application/use_cases/user/RemoveUser';
import UpdateUser from '../../../application/use_cases/user/UpdateUser';

// import UserRepositorySQL from "../../../infrastructure/repositories/user/UserRepositorySQL";
import UserRepositoryMongo from '../../../infrastructure/repositories/user/UserRepositoryMongo';

export default class UserController {
  async createUser(req: Request, res: Response, next: NextFunction): Promise<any> {
    const { body } = req;

    try {
      const user = await CreateUser(body, new UserRepositoryMongo(), new BcryptManager());
      const userSerializer = UserSerializer.getInstance();

      return res.status(httpStatus.CREATED).send(userSerializer.singleSerialize(user));
    } catch (error) {
      next(new HttpException(httpStatus.INTERNAL_SERVER_ERROR, error.message));
    }
  }

  async getUser(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    try {
      const user = await GetUser(id, new UserRepositoryMongo() /* new UserRepositorySQL() */);
      const userSerializer = UserSerializer.getInstance();

      res.send(userSerializer.singleSerialize(user));
    } catch (error) {
      next(new HttpException(httpStatus.NOT_FOUND, error.message));
    }
  }

  async getAllUsers(req: Request, res: Response) {
    const { page, limit } = req.query;
    const pagination = Pagination(+page, +limit);
    const userSerializer = UserSerializer.getInstance();

    const users = await GetAllUsers(pagination, new UserRepositoryMongo());

    return res.send(Paginate(users, userSerializer, +page, +limit));
  }

  async updateUser(req: Request, res: Response, next: NextFunction) {
    const { params, body } = req;

    try {
      await UpdateUser(params.id, body, new UserRepositoryMongo());

      return res.status(httpStatus.NO_CONTENT).send();
    } catch (error) {
      next(new HttpException(httpStatus.NOT_FOUND, error.message));
    }
  }

  async deleteUser(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    try {
      await RemoveUser(id, new UserRepositoryMongo());
      return res.status(httpStatus.NO_CONTENT).send();
    } catch (error) {
      next(new HttpException(httpStatus.NOT_FOUND, error.message));
    }
  }
}
