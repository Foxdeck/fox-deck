import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Logger,
  Post,
} from "@nestjs/common";
import { User } from "@prisma/client";
import { UserService } from "./user.service";
import {
  LoginRequestDto,
  CreateUserRequestDto,
  LoginResponseDto,
} from "./user.dto";
import { InvalidLoginException } from "./invalid-login.exception";
import {
  ApiExtraModels,
  ApiOkResponse,
  ApiTags,
  getSchemaPath,
} from "@nestjs/swagger";

/**
 * Controller which handles CRUD operations for users.
 */
@ApiTags("Users")
@Controller()
export class UserController {
  logger = new Logger(UserController.name);

  constructor(private readonly userService: UserService) {}

  @ApiOkResponse({
    description: "A JWT Token containing basic user information.",
    schema: {
      $ref: getSchemaPath(LoginResponseDto),
    },
  })
  @ApiExtraModels(LoginResponseDto)
  @HttpCode(HttpStatus.OK)
  @Post("login")
  async getUser(@Body() body: LoginRequestDto): Promise<LoginResponseDto> {
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
  @Post("register")
  async createUser(@Body() body: CreateUserRequestDto): Promise<User> {
    try {
      const { email, password, username } = body;
      return await this.userService.createUser({
        email,
        password,
        username,
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
