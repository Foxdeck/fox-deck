import {ApiProperty} from "@nestjs/swagger";
import {IsArray, IsBoolean, IsIn, IsNumber, IsOptional, IsString, Min} from "class-validator";
import {Question} from "@prisma/client";
import {type GetQuestionsVisibility} from "./question.dto.types";
import {Transform, Type} from "class-transformer";

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
  @IsString()
  category: string;

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
 * GET /question?search=sun&page=4
 * GET /question?search=sun&page=4&visibility=private&visibility=public
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
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  @Min(1)
  public page?: number = 1;

  /**
   * Filter for questions based on their visibility status.
   * Can be 'public', 'private'.
   */
  @ApiProperty({
    required: false,
    isArray: true,
    example: ['public', 'private']
  })
  @IsOptional()
  @IsArray()
  @IsIn(["public", "private"], { each: true })
  @Transform(({ value }) => (Array.isArray(value) ? value : Array(value)))
  public visibility?: GetQuestionsVisibility[] = ["public", "private"];
}