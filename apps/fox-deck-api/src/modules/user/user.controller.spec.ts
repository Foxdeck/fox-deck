import {UserController} from "./user.controller";
import {UserService} from "./user.service";
import {Test, TestingModule} from "@nestjs/testing";
import {CreateUserRequestDto, LoginRequestDto} from "./user.dto";
import {PasswordService} from "../../shared/services/password-service/password.service";
import {JwtModule} from "@nestjs/jwt";

describe("UserController", () => {
    let userController: UserController;
    let userService: UserService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                JwtModule.register({
                    global: true,
                    signOptions: { expiresIn: "1y" },
                }),
            ],
            controllers: [UserController],
            providers: [UserService, PasswordService],
        }).compile();

        userController = module.get<UserController>(UserController);
        userService = module.get<UserService>(UserService);
    });

    it("should register a new user", async () => {
        jest.spyOn(userService, 'createUser').mockResolvedValue({ id: '123', name: 'John' });
        const createUserRequestDto: CreateUserRequestDto = { username: 'John', email: 'john@example.com', password: 'password' };
        const result = await userController.createUser(createUserRequestDto);
        expect(result).toEqual({ id: '123', name: 'John' });
    })

    it("should login a new user", async () => {
        jest.spyOn(userService, 'getUser').mockResolvedValue({ accessToken: 'jwt-token' });
        const loginRequestDto: LoginRequestDto = { email: 'john@example.com', password: 'password' };
        const result = await userController.getUser(loginRequestDto);
        expect(result).toEqual({ accessToken: 'jwt-token' });
    })
})