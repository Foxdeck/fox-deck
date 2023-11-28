import {Module} from "@nestjs/common";
import {UserController} from "./user.controller";
import {UserService} from "./user.service";
import {PrismaService} from "../../shared/services/prisma.service";
import {PasswordService} from "../../shared/services/password.service";
import {JwtModule} from "@nestjs/jwt";

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: "1y" },
    }),
  ],
  providers: [UserService, PrismaService, PasswordService],
  controllers: [UserController],
})
export class UserModule {}
