import {Module} from "@nestjs/common";
import {PrismaService} from "../../shared/services/prisma.service";
import {QuestionnaireController} from "./questionnaire.controller";
import {QuestionnaireService} from "./questionnaire.service";

@Module({
  providers: [PrismaService, QuestionnaireService],
  controllers: [QuestionnaireController],
})
export class QuestionnaireModule {}
