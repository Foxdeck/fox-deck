import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsBoolean, IsNumber } from "class-validator";
import { Question } from "@prisma/client";

export class QuestionsResponseDto implements Question {
  @ApiProperty()
  @IsString()
  question: string;

  @ApiProperty()
  @IsString()
  solution: string;

  @ApiProperty()
  @IsBoolean()
  isPublic: boolean;

  @ApiProperty()
  @IsString()
  authorId: string;

  @ApiProperty()
  @IsNumber()
  average: number | null;

  @ApiProperty()
  @IsNumber()
  goodAt: number | null;

  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  lastAnswered: Date | null;

  @ApiProperty()
  notGoodAt: number | null;
}

export class CreateQuestionRequestDto {
  @ApiProperty()
  @IsString()
  question: string;

  @ApiProperty()
  @IsString()
  solution: string;

  @ApiProperty()
  @IsString()
  authorId: string;

  @ApiProperty()
  @IsBoolean()
  isPublic: boolean;
}
