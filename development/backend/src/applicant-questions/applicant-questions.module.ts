import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicantQuestion } from './entities/applicant_questions.entity';
import { ApplicantQuestionService } from './applicant-questions.service';
import { ApplicantQuestionController } from './applicant-questions.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ApplicantQuestion])],
  controllers: [ApplicantQuestionController],
  providers: [ApplicantQuestionService],
  exports: [ApplicantQuestionService],
})
export class ApplicantQuestionModule {}
