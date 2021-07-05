import { User } from '../../../../src/domain/entities/User';

import { Pagination } from '../../../../src/interfaces/web/Pagination';
import { Collection } from '../../../../src/domain/Repository/interfaces/IRead';
import { IUserRepository } from '../../../../src/domain/Repository/user/IUserRepository';

import GetAllUsers from '../../../../src/application/use_cases/user/GetAllUsers';

const mockUserRepository = new IUserRepository();

describe('Use Case: GetAllUsers', () => {
  test('should resolve with all the users persisted in repository', async () => {
    // given
    const collection: Collection = {
      count: 2,
      records: [
        new User(1, 'John', 'Doe', 'john.doe@email.com', 'abcd-1234', 'basic', 'male'),
        new User(2, 'jane', 'Doe', 'jane.doe@email.com', 'abcd-1234', 'basic', 'femmale')
      ]
    };
    mockUserRepository.find = jest.fn((): Promise<Collection> => {
      return Promise.resolve(collection);
    });

    // when
    const results = await GetAllUsers(Pagination(1, 10), mockUserRepository);

    // then
    expect(results).toEqual(collection);
  });
});
