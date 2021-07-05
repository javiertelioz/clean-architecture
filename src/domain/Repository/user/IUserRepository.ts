import { User } from '../../entities/User';

import { IBaseRepository } from '../BaseRepository';

/**
 * UserRepository Interface
 * @interface
 */
export class IUserRepository extends IBaseRepository<User> {
  getByEmail(email: string): Promise<User | boolean> {
    throw new Error('Method not implemented.');
  }
}
