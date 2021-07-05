import { IUserRepository } from '../../../domain/Repository/user/IUserRepository';

import { ExceptionCode, ExceptionMessages } from '../../../domain/exceptions/ExceptionMessages';

export default async (id: string | number, userRepository: IUserRepository) => {
  const exist = await userRepository.get(id);

  if (!exist) {
    throw new Error(ExceptionMessages[ExceptionCode.ENTITY_NOT_FOUND]);
  }

  return userRepository.remove(id);
};
