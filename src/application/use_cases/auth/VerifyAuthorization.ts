import { IAccessTokenManager } from '../../../application/security/IAccessTokenManager';

import { ExceptionCode, ExceptionMessages } from '../../../domain/exceptions/ExceptionMessages';

export default (token: string, JwtAccessTokenManager: IAccessTokenManager) => {
  const decode = JwtAccessTokenManager.decode(token);

  if (!decode) {
    throw new Error(ExceptionMessages[ExceptionCode.NOT_AUTHORIZED]);
  }

  return {
    uuid: decode.uuid,
    firstname: decode.firstname,
    lastname: decode.lastname,
    role: decode.role
  };
};
