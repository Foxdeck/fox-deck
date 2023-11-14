import { HttpException, HttpStatus } from '@nestjs/common';

/**
 * Exception which is thrown, if the users login failed.
 */
export class InvalidLoginException extends HttpException {
  constructor() {
    super('Login credentials are not correct', HttpStatus.UNAUTHORIZED);
  }
}
