import SequelizeAdapter from '../../../infrastructure/orm/sequelize';

import { User, IUser } from '../../../domain/entities/User/index';
import { Collection, Pagination } from '../../../domain/Repository/interfaces/IRead';
import { IUserRepository } from '../../../domain/Repository/user/IUserRepository';

export default class UserRepositorySQL extends IUserRepository {
  private db = null;
  private model = null;

  constructor() {
    super();
    this.db = SequelizeAdapter.instance.sequelize;
    this.model = this.db.model('user');
  }

  async create(user: IUser): Promise<User> {
    const { firstname, lastname, email, password, gender } = user;
    const seqUser = await this.model.create({ firstname, lastname, email, password, gender });

    await seqUser.save();

    return new User(
      seqUser.id,
      seqUser.firstname,
      seqUser.lastname,
      seqUser.email,
      seqUser.password,
      seqUser.role,
      seqUser.gender
    );
  }

  async update(user: IUser): Promise<boolean> {
    const seqUser = await this.model.findByPk(user.id);

    if (!seqUser) {
      return false;
    }

    const { firstname, lastname, email, password, gender } = user;
    await this.model.update({ firstname, lastname, email, password, gender });

    return true;
  }

  async remove(userId: string | number): Promise<any | boolean> {
    const seqUser = await this.model.findByPk(userId);

    if (!seqUser) {
      return false;
    }

    return seqUser.destroy();
  }

  async get(userId: string | number): Promise<User | boolean> {
    const seqUser = await this.model.findByPk(userId);

    if (!seqUser) {
      return false;
    }

    return new User(
      seqUser.id,
      seqUser.firstname,
      seqUser.lastname,
      seqUser.email,
      seqUser.password,
      seqUser.role,
      seqUser.gender
    );
  }

  async find(filters = [], pagination: Pagination): Promise<Collection> {
    const seqUsers = await this.model.findAll({
      limit: pagination.limit,
      where: filters
    });

    return seqUsers.map((seqUser: any) => {
      return new User(
        seqUser.id,
        seqUser.firstname,
        seqUser.lastname,
        seqUser.email,
        seqUser.password,
        seqUser.role,
        seqUser.gender
      );
    });
  }

  async getByEmail(email: string): Promise<User | boolean> {
    const seqUser = await this.model.find({ email });

    if (!seqUser) {
      return false;
    }

    return new User(
      seqUser.id,
      seqUser.firstname,
      seqUser.lastname,
      seqUser.email,
      seqUser.password,
      seqUser.role,
      seqUser.gender
    );
  }
}
