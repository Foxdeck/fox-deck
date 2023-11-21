import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from "@nestjs/common";
import { Prisma, User } from "@prisma/client";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "../../shared/services/prisma.service";
import { PasswordService } from "../../shared/services/password.service";
import { InvalidLoginException } from "./invalid-login.exception";
import { UserDto } from "./user.dto";
import { LoginResponse } from "./user.types";

@Injectable()
export class UserService {
  logger = new Logger(UserService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly passwordService: PasswordService,
    private readonly jwtService: JwtService,
  ) {}

  // TODO: what happens if the user forgot his password / username?

  async getUser(user: UserDto): Promise<LoginResponse> {
    try {
      // TODO: login via email or username
      const { email, password } = user;
      const userFindArgs: Prisma.UserFindFirstArgs = {
        where: {
          email,
        },
      };
      const found = await this.prisma.user.findFirst(userFindArgs);

      const areCorrectLoginCredentials =
        found && (await this.passwordService.compare(password, found.password));
      if (!areCorrectLoginCredentials) {
        throw new InvalidLoginException();
      }

      return {
        access_token: await this.jwtService.signAsync({
          id: found.id,
          email: found.email,
          username: found.username,
        }),
      };
    } catch (e) {
      if (e instanceof InvalidLoginException) {
        throw e;
      }
      throw new InternalServerErrorException("Error while logging in");
    }
  }

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    try {
      // TODO: check if email is already registered
      // TODO: register via email & username
      return this.prisma.user.create({
        data: {
          ...data,
          password: await this.passwordService.encrypt(data.password),
        },
      });
    } catch (e) {
      throw e;
    }
  }
}
