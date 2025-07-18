// src/applicant-questions/applicant-question.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicantQuestion } from './entity/applicant_questions.entity';
import { ApplicantQuestionService } from './applicant-questions.service';
import { ApplicantQuestionController } from './applicant-questions.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ApplicantQuestion])],
  controllers: [ApplicantQuestionController],
  providers: [ApplicantQuestionService],
  exports: [ApplicantQuestionService], // optional, if used in other modules
})
export class ApplicantQuestionModule {}
