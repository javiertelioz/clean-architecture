import { IUserRepository } from '../../../domain/Repository/user/IUserRepository';
import { ExceptionCode, ExceptionMessages } from '../../../domain/exceptions/ExceptionMessages';

export default async (id: string | number, userRepository: IUserRepository): Promise<any> => {
  const user = await userRepository.get(id);

  if (!user) {
    throw new Error(ExceptionMessages[ExceptionCode.ENTITY_NOT_FOUND]);
  }

  return user;
};
