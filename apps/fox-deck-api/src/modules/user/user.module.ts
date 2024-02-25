import {Module} from "@nestjs/common";
import {UserController} from "./user.controller";
import {UserService} from "./user.service";
import {PasswordService} from "../../shared/services/password.service";
import {JwtModule} from "@nestjs/jwt";
import {DatabaseModule} from "../database/database.module";

@Module({
  imports: [
    JwtModule.register({
      global: true,
      signOptions: { expiresIn: "1y" },
    }),
    DatabaseModule
  ],
  providers: [UserService, PasswordService],
  controllers: [UserController],
})
export class UserModule {}
