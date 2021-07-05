import JwtAccessTokenManager from '../../../../src/infrastructure/security/JwtAccessTokenManager';

import VerifyAuthorization from '../../../../src/application/use_cases/auth/VerifyAuthorization';

const mockAccessTokenManager = new JwtAccessTokenManager();

describe('Use Case: VerifyAuthorization', () => {
  test('should resolve with the decoded user data (ID) when OAuth JWT access token is valid', () => {
    // given
    mockAccessTokenManager.decode = jest.fn(() => {
      return {
        uuid: 1234,
        firstname: 'joe',
        lastname: 'doe',
        role: 'admin'
      };
    });

    // when
    const result = VerifyAuthorization('some-jwt-access-token', mockAccessTokenManager);

    // then
    expect(result).toEqual({
      uuid: 1234,
      firstname: 'joe',
      lastname: 'doe',
      role: 'admin'
    });
  });

  test('should throw an Error when OAuth JWT access token is invalid', () => {
    // given
    mockAccessTokenManager.decode = jest.fn(() => undefined);

    // when
    const ThrowWrongAccessToken = () => {
      VerifyAuthorization('a-wrong-jwt-access-token', mockAccessTokenManager);
    };

    expect(ThrowWrongAccessToken).toThrowError("You're not authorized");
  });
});
