import { User } from '../../../../src/domain/entities/User';

import { IUserRepository } from '../../../../src/domain/Repository/user/IUserRepository';

import GetUser from '../../../../src/application/use_cases/user/GetUser';

const mockUserRepository = new IUserRepository();

describe('Use Case: GetUser', () => {
  test('should resolve with the corresponding persisted user entity', async () => {
    // given
    const correspondingUser = new User(123, 'John', 'Doe', 'john.doe@email.com', 'abcd-1234', 'basic', 'male');
    mockUserRepository.get = jest.fn((): Promise<User | boolean> => {
      return Promise.resolve(correspondingUser);
    });

    // when
    const user = await GetUser(123, mockUserRepository);

    // then
    expect(mockUserRepository.get).toHaveBeenCalledWith(123);
    expect(user).toEqual(correspondingUser);
  });

  test('should resolve with user entity not found', async () => {
    // given
    mockUserRepository.get = jest.fn((): Promise<User | boolean> => {
      return Promise.resolve(false);
    });

    // when
    const ThrowNotFound = async () => await GetUser(123, mockUserRepository);

    // then
    expect(ThrowNotFound).rejects.toThrowError('Entity not found.');
  });
});
