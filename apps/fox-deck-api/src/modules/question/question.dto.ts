import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNumber, IsString } from "class-validator";
import { Question } from "@prisma/client";

class QuestionResponseAuthorDto {
  @ApiProperty()
  @IsString()
  username: string;
}

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

  @ApiProperty({ type: QuestionResponseAuthorDto })
  author: QuestionResponseAuthorDto;

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
