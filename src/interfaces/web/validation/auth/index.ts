import { IsString, Length, IsNotEmpty, IsEmail } from 'class-validator';

import { ExceptionCode } from '../../../../domain/exceptions/ExceptionMessages';

export default class Login {
  @IsEmail(undefined, {
    message: ExceptionCode[ExceptionCode.NOT_VALID_EMAIL]
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(6, 12)
  password: string;
}
