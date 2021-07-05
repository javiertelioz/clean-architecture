import { User } from '../../../domain/entities/User';
import { IUserRepository } from '../../../domain/Repository/user/IUserRepository';

import { ExceptionCode, ExceptionMessages } from '../../../domain/exceptions/ExceptionMessages';

export default async (id: string | number, { firstname, lastname, email, gender }, userRepository: IUserRepository) => {
  const exist: any | User = await userRepository.get(id);

  if (!exist) {
    throw new Error(ExceptionMessages[ExceptionCode.ENTITY_NOT_FOUND]);
  }

  const user = new User(
    id,
    firstname || exist.firstname,
    lastname || exist.lastname,
    email || exist.email,
    null,
    null,
    gender || exist.gender
  );

  const isUpdated = await userRepository.update(user);

  if (!isUpdated) {
    throw new Error(ExceptionMessages[ExceptionCode.BAD_REQUEST]);
  }

  return isUpdated;
};
