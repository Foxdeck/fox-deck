import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { Expose } from "class-transformer";

export class LoginRequestDto {
  @ApiProperty()
  @IsString()
  email: string;
  @ApiProperty()
  @IsString()
  password: string;
}

export class CreateUserRequestDto {
  @ApiProperty()
  @IsString()
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
