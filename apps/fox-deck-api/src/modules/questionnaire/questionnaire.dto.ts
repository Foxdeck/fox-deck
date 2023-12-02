import {Question, Questionnaire} from "@prisma/client";
import {ApiProperty} from "@nestjs/swagger";
import {IsString} from "class-validator";

export class QuestionnaireResponseDto implements Questionnaire {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsString()
  authorId: string;

  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  questions: Question[];
}