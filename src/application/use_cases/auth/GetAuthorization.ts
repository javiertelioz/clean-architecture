import { IUserRepository } from '../../../domain/Repository/user/IUserRepository';
import { IAccessTokenManager } from '../../../application/security/IAccessTokenManager';
import { ICryptManager } from '../../../application/security/ICryptManager';

import { ExceptionCode, ExceptionMessages } from '../../../domain/exceptions/ExceptionMessages';

export default async (
  { email, password },
  userRepository: IUserRepository,
  JwtAccessTokenManager: IAccessTokenManager,
  Bcrypt: ICryptManager
) => {
  const user: any = await userRepository.getByEmail(email);

  if (!user) {
    throw new Error(ExceptionMessages[ExceptionCode.INVALID_EMAIL_AND_PASSWORD]);
  }

  if (!Bcrypt.compare(password, user.password)) {
    throw new Error(ExceptionMessages[ExceptionCode.INVALID_EMAIL_AND_PASSWORD]);
  }

  const token = JwtAccessTokenManager.generate({
    uuid: user.id,
    firstname: user.firstname,
    lastname: user.lastname,
    role: user.role
  });

  return { token };
};
