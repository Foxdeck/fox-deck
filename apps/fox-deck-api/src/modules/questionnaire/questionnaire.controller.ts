import {Controller, Get, HttpCode, HttpStatus, InternalServerErrorException, Param,} from "@nestjs/common";
import {ApiExtraModels, ApiOkResponse, ApiTags} from "@nestjs/swagger";
import {Security, SecurityType,} from "../../shared/decorators/security.decorator";
import {QuestionnaireResponseDto} from "./questionnaire.dto";
import {QuestionnaireService} from "./questionnaire.service";

/**
 * Controller which handles CRUD operations for questionnaires.
 */
@ApiTags("Questionnaire")
@Controller("questionnaire")
export class QuestionnaireController {
  constructor(private readonly questionnaireService: QuestionnaireService) {}

  /**
   * Returns a single questionnaire from the database.
   * @param id {string} the id of the questionnaire to get.
   */
  @ApiOkResponse({
    description: "Returns a questionnaire via its id.",
    type: QuestionnaireResponseDto,
  })
  @ApiExtraModels(QuestionnaireResponseDto)
  @Security(SecurityType.NO_SECURE)
  @HttpCode(HttpStatus.OK)
  @Get(":id")
  async getQuestionnaireById(
    @Param("id") id: string,
  ): Promise<QuestionnaireResponseDto> {
    try {
      return this.questionnaireService.getQuestionnaire(id);
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  /**
   * Returns a list of questionnaires from the database.
   */
  @ApiOkResponse({
    description: "Returns a list of questionnaires.",
    type: [QuestionnaireResponseDto],
  })
  @ApiExtraModels(QuestionnaireResponseDto)
  @Security(SecurityType.NO_SECURE)
  @HttpCode(HttpStatus.OK)
  @Get()
  async getAllQuestionnaires(): Promise<QuestionnaireResponseDto[]> {
    try {
      return this.questionnaireService.getAllQuestionnaires();
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }
}