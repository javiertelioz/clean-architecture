import { ValidationError as ClassValidationError } from 'class-validator';

import { ExceptionMessages, ExceptionCode } from './ExceptionMessages';

type errors = Array<{
  name: string;
  message: string;
}>;

export interface EntityValidationError {
  errors: errors;
  property: string;
}

export class EntityValidationErrors {
  errors: EntityValidationError[];

  constructor(validationErrors: ClassValidationError[]) {
    this.errors = [];
    this._buildErrors(validationErrors);
  }

  public get isValid(): boolean {
    return this.errors.length === 0;
  }

  private _buildErrors(validationErrors: ClassValidationError[]): void {
    validationErrors.forEach(validationError => {
      const errors: errors = [];

      for (const key in validationError.constraints) {
        const errorCode: any = validationError.constraints[key];
        errors.push({
          name: errorCode,
          message: ExceptionMessages[ExceptionCode[errorCode]]
        });
      }

      this.errors.push({
        property: validationError.property,
        errors
      });
    });
  }
}
