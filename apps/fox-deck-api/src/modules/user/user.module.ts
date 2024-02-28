import {Module} from "@nestjs/common";
import {UserController} from "./user.controller";
import {UserService} from "./user.service";
import {PasswordService} from "../../shared/services/password.service";
import {JwtModule} from "@nestjs/jwt";

@Module({
  imports: [
    JwtModule.register({
      global: true,
      signOptions: { expiresIn: "1y" },
    }),
  ],
  providers: [UserService, PasswordService],
  controllers: [UserController],
})
export class UserModule {}
