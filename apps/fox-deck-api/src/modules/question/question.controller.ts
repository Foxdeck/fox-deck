import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  Param,
  Post,
  Put,
  Req,
} from "@nestjs/common";
import { Question } from "@prisma/client";
import { QuestionService } from "./question.service";
import { CreateQuestionRequestDto, QuestionsResponseDto } from "./question.dto";
import {
  ApiBearerAuth,
  ApiExtraModels,
  ApiOkResponse,
  ApiTags,
} from "@nestjs/swagger";
import {
  Security,
  SecurityType,
} from "../../shared/decorators/security.decorator";
import { AuthenticatedRequest } from "../../shared/interfaces/authenticated-request.interface";

/**
 * Controller which handles CRUD operations for questions.
 */
@ApiTags("Questions")
@Controller()
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @ApiOkResponse({
    description: "Returns a question via its id.",
    type: QuestionsResponseDto,
  })
  @ApiExtraModels(QuestionsResponseDto)
  @HttpCode(HttpStatus.OK)
  @Get("question/:id")
  async getQuestionById(
    @Param("id") id: string,
  ): Promise<QuestionsResponseDto> {
    try {
      return await this.questionService.question({ id: String(id) });
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  @ApiOkResponse({
    description: "Returns a list of questions.",
    type: QuestionsResponseDto,
    isArray: true,
  })
  @ApiExtraModels(QuestionsResponseDto)
  @HttpCode(HttpStatus.OK)
  @Get("question")
  async getQuestions(): Promise<QuestionsResponseDto[]> {
    try {
      return await this.questionService.questions({});
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  @ApiOkResponse({
    description: "Returns a question by its question text.",
    type: QuestionsResponseDto,
    isArray: true,
  })
  @ApiExtraModels(QuestionsResponseDto)
  @HttpCode(HttpStatus.OK)
  @Get("search/question/:search")
  async getQuestionsByText(
    @Param("search") search: string,
  ): Promise<QuestionsResponseDto[]> {
    try {
      return await this.questionService.questions({
        where: {
          question: { contains: search },
        },
      });
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  @ApiBearerAuth("access-token")
  @HttpCode(HttpStatus.CREATED)
  @Security(SecurityType.JWT_VALID)
  @Post("question")
  async createQuestion(
    @Body() data: CreateQuestionRequestDto,
    @Req() request: AuthenticatedRequest,
  ): Promise<Question> {
    try {
      const user = request.user;
      return this.questionService.createQuestion({
        ...data,
        authorId: user.id,
      });
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  @HttpCode(HttpStatus.OK)
  @Put("question/:id")
  async updateQuestion(
    @Param("id") id: string,
    @Body() data: CreateQuestionRequestDto,
    @Req() request: AuthenticatedRequest,
  ): Promise<Question> {
    try {
      const user = request.user;
      return await this.questionService.updateQuestion({
        where: {
          id: user.id,
        },
        data,
      });
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }
}
