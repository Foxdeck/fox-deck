import { Test, TestingModule } from "@nestjs/testing";
import { HttpStatus, INestApplication } from "@nestjs/common";
import * as request from "supertest";
import { UserService } from "./user.service";
import { UserModule } from "./user.module";
import { InvalidLoginException } from "./invalid-login.exception";

/**
 * Because we don't want to use a real database, we mock the implementation.
 */
const mockUserService = {
  /**
   * Get user method should return the access_token of a specific user or an InvalidLoginException.
   */
  getUser: jest.fn().mockImplementation((dto) => {
    if (dto.email === "test@example.com" && dto.password === "test") {
      return Promise.resolve({
        access_token: "my_access_token",
      });
    } else {
      throw new InvalidLoginException();
    }
  }),
};

describe("UserController (e2e)", () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [UserModule],
    })
      // we are using the mocked UserService
      .overrideProvider(UserService)
      .useValue(mockUserService)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it("/login (POST) - should be successful", async () => {
    return request(app.getHttpServer())
      .post("/login")
      .send({ email: "test@example.com", password: "test" })
      .expect(HttpStatus.OK)
      .expect({
        access_token: "my_access_token",
      });
  });

  it("/login (POST) - should fail because email and password is null", () => {
    return request(app.getHttpServer())
      .post("/login")
      .send({ email: null, password: null })
      .expect({
        statusCode: HttpStatus.UNAUTHORIZED,
        message: "Login credentials are not correct",
      });
  });

  it("/login (POST) - should fail because email is null", () => {
    return request(app.getHttpServer())
      .post("/login")
      .send({ email: null, password: "mypassword" })
      .expect({
        statusCode: HttpStatus.UNAUTHORIZED,
        message: "Login credentials are not correct",
      });
  });

  it("/login (POST) - should fail because password is null", () => {
    return request(app.getHttpServer())
      .post("/login")
      .send({ email: "my@email.com", password: null })
      .expect({
        statusCode: HttpStatus.UNAUTHORIZED,
        message: "Login credentials are not correct",
      });
  });
});
