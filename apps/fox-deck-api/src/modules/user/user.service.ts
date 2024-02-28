import {Injectable, InternalServerErrorException, Logger,} from "@nestjs/common";
import {JwtService} from "@nestjs/jwt";
import {v4 as uuidv4} from "uuid";
import {PasswordService} from "../../shared/services/password.service";
import {JwtBody} from "../../shared/interfaces/jwt-body.interface";
import {InvalidLoginException} from "./invalid-login.exception";
import {CreateUserRequestDto, LoginRequestDto, LoginResponseDto} from "./user.dto";
import {SelectUser} from "./types/select-user.type";
import {db} from "../../db/database";

/**
 * Service class for user-related operations.
 *
 * @class
 * @public
 */
@Injectable()
export class UserService {
    logger = new Logger(UserService.name);

    constructor(
        private readonly passwordService: PasswordService,
        private readonly jwtService: JwtService
    ) {
    }

    /**
     * Retrieves user information from the database and validates login credentials.
     *
     * @param {LoginRequestDto} loginRequest - The login request containing the user's email and password.
     * @returns {Promise<LoginResponseDto>} - A promise that resolves to a login response containing a JWT token if the login is successful.
     * @throws {InvalidLoginException} - Throws an InvalidLoginException if the login credentials are invalid.
     * @throws {InternalServerErrorException} - Throws an InternalServerErrorException if there is an error while logging in.
     */
    public async getUser(loginRequest: LoginRequestDto): Promise<LoginResponseDto> {
        try {
            const {email, password} = loginRequest;

            const foundUser = await db
                .selectFrom("User")
                .select(["id", "username", "email", "password"])
                .where("email", "=", email)
                .executeTakeFirstOrThrow(InvalidLoginException);

            const isPasswordMatch =
                foundUser && (await this.passwordService.compare(password, foundUser.password));

            if (!isPasswordMatch) {
                throw new InvalidLoginException();
            }
            const jwtToken = this.signJwtToken(foundUser);

            this.logger.debug(`(getUser) => User logged in with id: ${foundUser.id}`);
            return jwtToken;
        } catch (e) {
            this.logger.debug(`(getUser) => Error while logging in: ${e.stack}`);
            if (e instanceof InvalidLoginException) {
                throw e;
            }
            throw new InternalServerErrorException("Error while logging in");
        }
    }

    /**
     * Creates a new user using the provided data.
     *
     * @param {CreateUserRequestDto} data - The data needed to create the user.
     * @return {Promise<any>} - A promise that resolves with the result of the user creation.
     * @throws {Error} - If an error occurs during user creation.
     */
    public async createUser(data: CreateUserRequestDto): Promise<any> {
        try {
            const {
                email,
                password,
                username
            } = data;
            const userId = uuidv4();

            const encryptedPassword = await this.passwordService.encrypt(password);

            await db
                .insertInto("User")
                .values({
                    id: userId,
                    username,
                    email,
                    password: encryptedPassword
                })
                .executeTakeFirstOrThrow();

            this.logger.debug(`(createUser) => User created with id: ${userId}`);

            return userId;
        } catch (e) {
            this.logger.debug(`(createUser) => Error creating user: ${e.message}`);
            throw e;
        }
    }

    /**
     * Signs a JWT token for the given user.
     *
     * @param {SelectUser} foundUser - The user information to include in the JWT token.
     * @private
     * @return {LoginResponseDto} - The login response with the signed JWT token.
     */
    private signJwtToken(foundUser: SelectUser): LoginResponseDto {
        const jwtPayload: JwtBody = {
            id: foundUser.id,
            email: foundUser.email,
            username: foundUser.username,
        };

        const loginResponse = new LoginResponseDto();
        loginResponse.accessToken = this.jwtService.sign(jwtPayload, {
            secret: process.env.JWT_SECRET
        });
        return loginResponse;
    }
}
