import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, IsString} from "class-validator";
import {Expose} from "class-transformer";

export class LoginRequestDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  password: string;
}

export class CreateUserRequestDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  username: string;

  @ApiProperty()
  @IsString()
  password: string;
}

export class LoginResponseDto {
  @ApiProperty()
  @IsString()
  @Expose()
  accessToken: string;
}
