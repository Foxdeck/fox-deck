import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { PrismaService } from '../../shared/services/prisma.service';
import { Prisma, User } from '@prisma/client';
import { PasswordService } from '../../shared/services/password.service';
import { UserDto } from './user.dto';
import { InvalidLoginException } from './invalid-login.exception';

@Injectable()
export class UserService {
  logger = new Logger(UserService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly passwordService: PasswordService,
  ) {}

  // TODO: what happens if the user forgot his password / username?

  async getUser(user: UserDto): Promise<User> {
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
        !found ||
        !(await this.passwordService.compare(password, found.password));
      if (areCorrectLoginCredentials) {
        throw new InvalidLoginException();
      }

      return found;
    } catch (e) {
      if (e instanceof InvalidLoginException) {
        throw e;
      }
      throw new InternalServerErrorException('Error while logging in');
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
