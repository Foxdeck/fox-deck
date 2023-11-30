import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  Param,
  Post,
  Put,
  Query,
  Req,
  ValidationPipe,
} from "@nestjs/common";
import {Question} from "@prisma/client";
import {QuestionService} from "./question.service";
import {CreateQuestionRequestDto, GetQuestionsRequestDto, QuestionsResponseDto} from "./question.dto";
import {ApiBearerAuth, ApiExtraModels, ApiOkResponse, ApiTags,} from "@nestjs/swagger";
import {Security, SecurityType,} from "../../shared/decorators/security.decorator";
import {AuthenticatedRequest} from "../../shared/interfaces/authenticated-request.interface";

/**
 * Controller which handles CRUD operations for questions.
 */
@ApiTags("Questions")
@Controller()
export class QuestionController {

  constructor(private readonly questionService: QuestionService) {}

  /**
   * Returns a single question from the database.
   * @param id {string} the id of the question to get.
   */
  @ApiOkResponse({
    description: "Returns a question via its id.",
    type: QuestionsResponseDto,
  })
  @ApiExtraModels(QuestionsResponseDto)
  @Security(SecurityType.NO_SECURE)
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

  /**
   * Returns a list of questions from the database. These list can be searched or filtered.
   * @param query {QuestionsResponseDto} the query the request can have.
   */
  @ApiOkResponse({
    description: "Returns a list of questions.",
    type: QuestionsResponseDto,
    isArray: true,
  })
  @ApiExtraModels(QuestionsResponseDto)
  @Security(SecurityType.NO_SECURE)
  @HttpCode(HttpStatus.OK)
  @Get("question")
  async getQuestions(
    @Query(new ValidationPipe({
      transform: true,
      transformOptions: {enableImplicitConversion: true},
      forbidNonWhitelisted: true
    })) query: GetQuestionsRequestDto
  ): Promise<QuestionsResponseDto[]> {
    try {
      const take = 10;
      const page = query.page && query.page > 0 ? query.page : 1;
      const skip = (page - 1) * take;
      return await this.questionService.questions({
        where: {
          question: { contains: query.search },
        },
        skip,
        take
      });
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  /**
   * Deletes a question.
   * Users can only delete their own questions, so a decoded JWT is passed within the request.
   * @param id {string} the id of the question
   * @param request {Request} the request, used because a user can only delete its own question.
   */
  @ApiBearerAuth("access-token")
  @Security(SecurityType.JWT_VALID)
  @ApiOkResponse({
    description: "Deletes a question and returns no content.",
  })
  @HttpCode(HttpStatus.OK)
  @Delete("question/:id")
  async deleteQuestion(
      @Param("id") id: string,
      @Req() request: AuthenticatedRequest,
  ): Promise<void> {
    try {
      const user = request.user;
      await this.questionService.deleteQuestion({ id: String(id),authorId: user.id });
    } catch (e) {
      throw new InternalServerErrorException(e)
    }
  }

  /**
   * Creates a new question.
   * Users can only create their own questions, so a decoded JWT is passed within the request.
   * @param data {CreateQuestionRequestDto} the dto which contains the question data.
   * @param request {Request} the request, used because a user can only create its own question.
   */
  @ApiBearerAuth("access-token")
  @Security(SecurityType.JWT_VALID)
  @HttpCode(HttpStatus.CREATED)
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

  /**
   * Updates a specific question.
   * Users can only update their own questions, so a decoded JWT is passed within the request.
   * @param id {string} the question id of the question to update
   * @param data {CreateQuestionRequestDto} he dto which contains the updated question data.
   * @param request {Request} the request, used because a user can only update its own question.
   */
  @ApiBearerAuth("access-token")
  @Security(SecurityType.JWT_VALID)
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
