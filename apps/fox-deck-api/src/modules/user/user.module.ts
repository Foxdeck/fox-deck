import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaService } from '../../shared/services/prisma.service';
import { PasswordService } from '../../shared/services/password.service';

@Module({
  providers: [UserService, PrismaService, PasswordService],
  controllers: [UserController],
})
export class UserModule {}
