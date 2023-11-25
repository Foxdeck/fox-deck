import { Injectable } from "@nestjs/common";
import { Prisma, Question } from "@prisma/client";
import { PrismaService } from "../../shared/services/prisma.service";
import { QuestionsResponseDto } from "./question.dto";

@Injectable()
export class QuestionService {
  constructor(private prisma: PrismaService) {}

  async question(
    questionWhereUniqueInput: Prisma.QuestionWhereUniqueInput,
  ): Promise<QuestionsResponseDto | null> {
    return this.prisma.question.findUnique({
      where: questionWhereUniqueInput,
      include: {
        author: {
          select: {
            username: true,
          },
        },
      },
    });
  }

  async questions(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.QuestionWhereUniqueInput;
    where?: Prisma.QuestionWhereInput;
    orderBy?: Prisma.QuestionOrderByWithRelationInput;
  }): Promise<QuestionsResponseDto[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.question.findMany({
      skip,
      take,
      cursor,
      where,
      include: {
        author: {
          select: {
            username: true,
          },
        },
      },
      orderBy,
    });
  }

  async createQuestion(data: Prisma.QuestionCreateInput): Promise<Question> {
    return this.prisma.question.create({
      data,
    });
  }

  async updateQuestion(params: {
    where: Prisma.QuestionWhereUniqueInput;
    data: Prisma.QuestionUpdateInput;
  }): Promise<Question> {
    const { where, data } = params;
    return this.prisma.question.update({
      data,
      where,
    });
  }

  async deleteQuestion(
    where: Prisma.QuestionWhereUniqueInput,
  ): Promise<Question> {
    return this.prisma.question.delete({
      where,
    });
  }
}
