import {Injectable, Logger} from "@nestjs/common";
import {PrismaService} from "../../shared/services/prisma.service";
import {QuestionnaireResponseDto} from "./questionnaire.dto";

/**
 * Service class for managing questionnaires.
 */
@Injectable()
export class QuestionnaireService {
  private readonly logger = new Logger(QuestionnaireService.name);

  constructor(private prisma: PrismaService) {}


  /**
   * Retrieves a questionnaire based on the given ID.
   *
   * @param {string} id - The ID of the questionnaire.
   * @returns {Promise<QuestionnaireResponseDto | null>} - A promise that resolves with the retrieved questionnaire, or `null` if no questionnaire is found.
   * @throws {Error} - If an error occurs while retrieving the questionnaire, an error will be thrown.
   */
  async getQuestionnaire(id: string): Promise<QuestionnaireResponseDto | null> {
    try {
      const questionnaire = await this.prisma.questionnaire.findUnique({
        where: { id },
        include: {
          QuestionAssignment: {
            select: {
              question: true
            }
          },
        },
      });

      return this.mapQuestionnaireResponse(questionnaire);
    } catch (e) {
      this.logger.error("An error occurred while retrieving the questionnaire: ", e);
      throw e;
    }
  }

  /**
   * Retrieves all questionnaires from the database.
   *
   * @returns {Promise<QuestionnaireResponseDto[]>} A Promise that resolves to an array of QuestionnaireResponseDto objects.
   * @throws {Error} If an error occurred while retrieving questionnaires from the database.
   */
  async getAllQuestionnaires(): Promise<QuestionnaireResponseDto[]> {
    try {
      const questionnaires = await this.prisma.questionnaire.findMany({
        include: {
          QuestionAssignment: {
            select: {
              question: true
            }
          },
        },
      });

      return questionnaires.map(this.mapQuestionnaireResponse);
    } catch (e) {
      this.logger.error("An error occurred while retrieving all questionnaires: ", e);
      throw e;
    }
  }

  private mapQuestionnaireResponse(questionnaire: any): QuestionnaireResponseDto {
    const {QuestionAssignment, ...rest} = questionnaire;

    return {
      ...rest,
      questions: QuestionAssignment.map((qa) => qa?.question),
    };
  }

}