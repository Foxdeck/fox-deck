import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsBoolean } from "class-validator";

export class QuestionDto {
  @ApiProperty()
  @IsString()
  question: string;

  @ApiProperty()
  @IsString()
  solution: string;

  @ApiProperty()
  @IsBoolean()
  isPublic: boolean;
}
