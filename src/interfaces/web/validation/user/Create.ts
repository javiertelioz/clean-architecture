import { IsIn, IsString, Length, IsEmail, IsNotEmpty, Matches } from 'class-validator';

import { ExceptionCode } from '../../../../domain/exceptions/ExceptionMessages';

export class CreateUser {
  @IsString()
  @IsNotEmpty()
  firstname: string;

  @IsString()
  @IsNotEmpty()
  lastname: string;

  @IsEmail(undefined, {
    message: ExceptionCode[ExceptionCode.NOT_VALID_EMAIL]
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(6, 12)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: ExceptionCode[ExceptionCode.PW_NOT_SECURE]
  })
  password: string;

  @IsString()
  @IsIn(['male', 'female'])
  gender: string;
}
