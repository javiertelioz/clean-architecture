import { Exception } from './Exception';
import { ExceptionCode } from './ExceptionMessages';

import { EntityValidationErrors, EntityValidationError } from './EntityValidationError';

export class EntityValidationException extends Exception {
  validationErrors: EntityValidationError[];

  constructor(validationErrors: EntityValidationErrors) {
    super(ExceptionCode.VALIDATION_FAILED);

    this.validationErrors = validationErrors.errors;
  }
}
