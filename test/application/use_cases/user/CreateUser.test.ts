import { User } from '../../../../src/domain/entities/User';

import BcryptManager from '../../../../src/infrastructure/security/BcryptManager';

import { IUserRepository } from '../../../../src/domain/Repository/user/IUserRepository';

import CreateUser from '../../../../src/application/use_cases/user/CreateUser';

const mockBcryptManager = new BcryptManager();
const mockUserRepository = new IUserRepository();

describe('Use Case: CreateUser', () => {
  test('should resolve with the newly persisted user (augmented with an ID)', async () => {
    // given
    const persistedUser = new User(null, 'John', 'Doe', 'john.doe@email.com', 'abcd-1234', 'basic', 'male');

    mockUserRepository.getByEmail = jest.fn((): Promise<User | boolean> => {
      return Promise.resolve(false);
    });
    mockUserRepository.create = jest.fn((): Promise<User> => {
      return Promise.resolve(persistedUser);
    });

    // when
    const user = await CreateUser(
      {
        firstname: 'John',
        lastname: 'Doe',
        email: 'john.doe@email.com',
        password: 'abcd-1234',
        gender: 'male'
      },
      mockUserRepository,
      mockBcryptManager
    );

    // then
    expect(user).toEqual(persistedUser);
    // expect(mockUserRepository.create).toHaveBeenCalledWith(persistedUser);
  });

  test('should resolve user exist', async () => {
    // given
    const persistedUser = new User(1, 'John', 'Doe', 'john.doe@email.com', 'abcd-1234', 'basic', 'male');

    mockUserRepository.getByEmail = jest.fn((): Promise<User | boolean> => {
      return Promise.resolve(persistedUser);
    });

    const ThrowWrongAccessToken = async () => {
      await CreateUser(
        {
          firstname: 'joe',
          lastname: 'doe',
          email: 'john@mail.com',
          password: 'abcd-1234',
          gender: 'male'
        },
        mockUserRepository,
        mockBcryptManager
      );
    };

    // then
    expect(ThrowWrongAccessToken).rejects.toThrowError('Duplicated record.');
  });
});
