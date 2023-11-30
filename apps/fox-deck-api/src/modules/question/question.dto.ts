import {ApiProperty} from "@nestjs/swagger";
import {IsArray, IsBoolean, IsNumber, IsOptional, IsString, Min} from "class-validator";
import {Question} from "@prisma/client";

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
  @IsBoolean()
  isPublic: boolean;
}

/**
 * Request which is used for retrieving multiple questions from the database.
 *
 * @example
 * GET /question?search=sun
 */
export class GetQuestionsRequestDto {

  /**
   * The string which should be searched for in the question.
   */
  @ApiProperty({
    required: false
  })
  @IsOptional()
  @IsString()
  public search?: string;

  /**
   * The page number for pagination.
   */
  @ApiProperty({
    required: false
  })
  @IsOptional()
  @Min(1)
  @IsNumber()
  public page?: number;

  /**
   * Filter for questions based on their visibility status.
   * Can be 'public', 'private', or both.
   */
  @ApiProperty({
    required: false,
    isArray: true,
    example: ['public', 'private']
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  public visibility?: string[];
}