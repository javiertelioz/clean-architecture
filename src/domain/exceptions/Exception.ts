import { ExceptionCode } from './ExceptionMessages';

export class Exception {
  name: string;
  message?: string;

  constructor(exception: ExceptionCode) {
    this.name = ExceptionCode[exception];
  }
}
