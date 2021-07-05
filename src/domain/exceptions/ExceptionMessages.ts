export enum ExceptionCode {
  NO_SESSION,
  BAD_REQUEST,
  PW_NOT_SECURE,
  BAD_CREDENTIALS,
  NOT_VALID_EMAIL,
  DUPLICATE_ENTRY,
  ENTITY_NOT_FOUND,
  VALIDATION_FAILED,
  INVALID_ACCESS_TOKEN,
  INVALID_EMAIL_AND_PASSWORD,
  NOT_AUTHORIZED
}

type ExceptionMessages = { [key in ExceptionCode | string]: string };

export const ExceptionMessages: ExceptionMessages = {
  [ExceptionCode.BAD_CREDENTIALS]: 'Incorrect email or password.',
  [ExceptionCode.DUPLICATE_ENTRY]: 'Duplicated record.',
  [ExceptionCode.ENTITY_NOT_FOUND]: 'Entity not found.',
  [ExceptionCode.PW_NOT_SECURE]: 'Password is not secure.',
  [ExceptionCode.NOT_VALID_EMAIL]: 'Email is not valid.',
  [ExceptionCode.VALIDATION_FAILED]: 'Validation failed.',
  [ExceptionCode.BAD_REQUEST]: 'Bad request.',
  [ExceptionCode.NO_SESSION]: 'There is no session.',
  [ExceptionCode.INVALID_ACCESS_TOKEN]: 'Invalid access token.',
  [ExceptionCode.NOT_AUTHORIZED]: "You're not authorized",
  [ExceptionCode.INVALID_EMAIL_AND_PASSWORD]: 'Email or password are incorrect.'
};
