/**
 * Base Repository Interface
 */
import { IWrite } from './interfaces/IWrite';
import { IRead, Collection, Pagination } from './interfaces/IRead';

export abstract class IBaseRepository<T> implements IWrite<T>, IRead<T> {
  create(item: T): Promise<T> {
    throw new Error('Method not implemented.');
  }

  update(item: T): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  remove(id: string | number): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  get(id: string | number): Promise<T | boolean> {
    throw new Error('Method not implemented.');
  }

  find(filters?: [], pagination?: Pagination): Promise<Collection> {
    throw new Error('Method not implemented.');
  }
}
