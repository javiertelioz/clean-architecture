import { validate } from 'class-validator';

import { EntityValidationErrors } from './exceptions/EntityValidationError';
import { EntityValidationException } from './exceptions/EntityValidationException';

export class EntityBase {
  async validate(): Promise<void> {
    const validationErrors = await validate(this);
    const validationResult = new EntityValidationErrors(validationErrors);

    if (!validationResult.isValid) throw new EntityValidationException(validationResult);
  }
}
