import { EMAIL_TAKEN_ERROR } from './constants';

export class EmailTakenError extends Error {
  constructor(prevErr?: Error) {
    super();

    this.message = EMAIL_TAKEN_ERROR;
    this.name = 'FailedToAuthenticate';
    this.stack = prevErr?.stack;

    Object.setPrototypeOf(this, new.target.prototype);
  }

  message: string;
  stack?: string | undefined;
}
