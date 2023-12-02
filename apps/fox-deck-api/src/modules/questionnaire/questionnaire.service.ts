import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../shared/services/prisma.service";
import { QuestionnaireResponseDto } from "./questionnaire.dto";

/**
 * Service which handles database interactions for questionnaires.
 */
@Injectable()
export class QuestionnaireService {
  constructor(private prisma: PrismaService) {}

  /**
   * Returns a single questionnaire with its questions from the database.
   * @param id {string} the id of the questionnaire to get.
   */
  async questionnaire(id: string): Promise<QuestionnaireResponseDto | null> {
    const questionnaire = await this.prisma.questionnaire.findUnique({
      where: { id },
    });

    if (!questionnaire) {
      return null;
    }

    const questionAssignments = await this.prisma.questionAssignment.findMany({
      where: { questionnaireId: id },
      include: {
        question: true,
      },
    });

    return {
      ...questionnaire,
      questions: questionAssignments.map((qa) => qa.question),
    };
  }
}
