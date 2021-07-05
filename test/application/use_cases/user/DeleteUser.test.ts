import { User } from '../../../../src/domain/entities/User';

import { IUserRepository } from '../../../../src/domain/Repository/user/IUserRepository';

import RemoveUser from '../../../../src/application/use_cases/user/RemoveUser';

const mockUserRepository = new IUserRepository();

describe('Use Case: RemoveUser', () => {
  test('should resolve deleted user', async () => {
    // given
    mockUserRepository.get = jest.fn((): Promise<User | boolean> => {
      return Promise.resolve(new User(123, 'joe', 'doe', 'john@mail.com', 'abcd-1234', 'profile', 'male'));
    });
    mockUserRepository.remove = jest.fn((): Promise<boolean> => Promise.resolve(true));

    // when
    const userDeleted = await RemoveUser(123, mockUserRepository);

    // then
    expect(userDeleted).toBe(true);
    expect(mockUserRepository.remove).toHaveBeenCalledWith(123);
  });

  test('should resolve user not found', async () => {
    // given
    mockUserRepository.get = jest.fn((): Promise<User | boolean> => {
      return Promise.resolve(false);
    });
    mockUserRepository.remove = jest.fn((): Promise<boolean> => Promise.resolve(true));

    // when
    const ThrowNotFound = async () => await RemoveUser(123, mockUserRepository);

    // then
    expect(ThrowNotFound).rejects.toThrowError('Entity not found.');
  });
});
