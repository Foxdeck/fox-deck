import { Module } from '@nestjs/common';
import { QuestionController } from './question.controller';
import { QuestionService } from './question.service';
import { PrismaService } from '../../shared/services/prisma.service';

@Module({
  providers: [QuestionService, PrismaService],
  controllers: [QuestionController],
})
export class QuestionModule {}
