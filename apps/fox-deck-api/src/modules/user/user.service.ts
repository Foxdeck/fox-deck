import {Injectable, InternalServerErrorException, Logger,} from "@nestjs/common";
import {User} from "@prisma/client";
import {JwtService} from "@nestjs/jwt";
import {PasswordService} from "../../shared/services/password.service";
import {InvalidLoginException} from "./invalid-login.exception";
import {CreateUserRequestDto, LoginRequestDto, LoginResponseDto} from "./user.dto";
import {JwtBody} from "../../shared/interfaces/jwt-body.interface";
import {SqliteProvider} from "../database/sqlite-provider.service";
import {v4 as uuidv4} from "uuid";

@Injectable()
export class UserService {
  logger = new Logger(UserService.name);

  constructor(
    private readonly passwordService: PasswordService,
    private readonly jwtService: JwtService,
    private readonly databaseService: SqliteProvider) {}

  // TODO: what happens if the user forgot his password / username?

  public async getUser(user: LoginRequestDto): Promise<LoginResponseDto> {
    try {
      // TODO: login via email or username
      const { email, password } = user;

      const found = await this.databaseService.select({
        table: "User",
        columns: ["id, username, email, password"],
        where: `email = '${email}'`,
        singleSelect: true
      }) as any


      const areCorrectLoginCredentials =
        found && (await this.passwordService.compare(password, found.password));
      this.logger.log(areCorrectLoginCredentials);
      if (!areCorrectLoginCredentials) {
        throw new InvalidLoginException();
      }

      const loginResponse = new LoginResponseDto();
      const jwtBody: JwtBody = {
        id: found.id,
        email: found.email,
        username: found.username,
      };

      loginResponse.accessToken = this.jwtService.sign(jwtBody, {
        secret: process.env.JWT_SECRET
      });

      this.logger.debug(`(getUser) => User logged in with id: ${found.id}`);
      return loginResponse;
    } catch (e) {
      this.logger.debug(`(getUser) => Error while logging in: ${e.stack}`);
      if (e instanceof InvalidLoginException) {
        throw e;
      }
      throw new InternalServerErrorException("Error while logging in");
    }
  }

  public async createUser(data: CreateUserRequestDto): Promise<User> {
    try {
      const {
        email,
        password,
        username
      } = data;
      const userId = uuidv4();
      // TODO: check if email is already registered
      // TODO: register via email & username
      const result = await this.databaseService.insert("User", {
        id: userId,
        username,
        email,
        password: await this.passwordService.encrypt(password),
      })

      this.logger.debug(`(createUser) => User created with id: ${userId}`);

      return result as any;
    } catch (e) {
      this.logger.debug(`(createUser) => Error creating user: ${e.message}`);
      throw e;
    }
  }
}
