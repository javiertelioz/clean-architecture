import { Request, Response, NextFunction } from 'express';

import HttpException from '../exceptions/HttpException';
import CreateUser from '../../application/use_cases/user/CreateUser';

import { UserRepositorySQL } from '../../infrastructure/repositories/user/UserRepositorySQL';
import { UserRepositoryMongo } from '../../infrastructure/repositories/user/UserRepositoryMongo';

export class UserController {
  // private userRepositoryMongo: UserRepositoryMongo = new UserRepositoryMongo();
  // private userRepository = EntityTarget<User>;

  async createUser(req: Request, res: Response): Promise<any> {
    const payload = req.body;

    try {
      const user = await CreateUser(payload, {
        userRepository: new UserRepositorySQL()
      });

      return res.send(user);
    } catch (error) {
      console.log(error);
      return res.send({ error: error.message });
    }
  }

  async getUser(req: Request, res: Response, next: NextFunction): Promise<Response> {
    const { id } = req.params;

    const user = await CreateUser(payload, {
      userRepository: new UserRepositorySQL()
    });

    /*const user = await new UserRepositorySQL().get(id);

    if (!user) next(new HttpException(404, "User not found"));*/

    return res.send(user);
  }

  async getAllUsers(req: Request, res: Response) {
    const users = await new UserRepositorySQL().find();
    res.send(users);
  }

  async updateUser(req: Request, res: Response): Promise<Response> {
    const { body } = req;
    const { id } = req.params;

    const user = await new UserRepositorySQL().merge(id, body);

    if (!user) next(new HttpException(404, 'User not found'));

    return res.send(`update user ${id}`);
  }

  async deleteUser(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    return res.send(`delete user ${id}`);
  }
}
