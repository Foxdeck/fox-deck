import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Logger,
  Post,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { UserService } from './user.service';
import { UserDto } from './user.dto';
import { InvalidLoginException } from './invalid-login.exception';
import { ApiTags } from '@nestjs/swagger';
import { LoginResponse } from './user.types';

/**
 * Controller which handles CRUD operations for users.
 */
@ApiTags('Users')
@Controller()
export class UserController {
  logger = new Logger(UserController.name);

  constructor(private readonly userService: UserService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async getUser(@Body() body: UserDto): Promise<LoginResponse> {
    try {
      return await this.userService.getUser(body);
    } catch (e) {
      const errorName = e.constructor.name;
      this.logger.error(
        `[getUser] - ${errorName}: ${e.message}: { email: ${body.email}, password=******* }`,
      );
      throw new InvalidLoginException();
    }
  }

  @HttpCode(HttpStatus.OK)
  @Post('register')
  async createUser(@Body() body: UserDto): Promise<User> {
    try {
      const { email, password } = body;
      return await this.userService.createUser({
        email,
        password,
      });
    } catch (e) {
      const errorName = e.constructor.name;
      this.logger.error(
        `[createUser] - ${errorName}: ${e.message}: { email: ${body.email}, password=******* }`,
      );
      throw e;
    }
  }
}
