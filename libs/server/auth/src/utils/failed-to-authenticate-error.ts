import { FAILED_TO_AUTHENTICATE_ERROR } from './constants';

export class FailedToAuthenticateError extends Error {
  constructor(prevErr?: Error) {
    super();

    this.message = FAILED_TO_AUTHENTICATE_ERROR;
    this.name = 'FailedToAuthenticate';
    this.stack = prevErr?.stack;

    Object.setPrototypeOf(this, new.target.prototype);
  }

  message: string;
  stack?: string | undefined;
}
