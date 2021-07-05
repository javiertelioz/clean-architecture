import { IsDefined, IsIn, IsString, ValidateIf, IsEmail, IsNotEmpty } from 'class-validator';

import { ExceptionCode } from '../../../../domain/exceptions/ExceptionMessages';

export class UpdateUser {
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @ValidateIf(o => o.firstname)
  firstname?: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @ValidateIf(o => o.lastname)
  lastname?: string;

  @IsDefined()
  @ValidateIf(o => o.email)
  @IsEmail(undefined, {
    message: ExceptionCode[ExceptionCode.NOT_VALID_EMAIL]
  })
  email?: string;

  @IsDefined()
  @IsString()
  @ValidateIf(o => o.gender)
  @IsIn(['male', 'female'])
  gender?: string;
}
