import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicantQuestion } from './entity/applicant_questions.entity';
import { ApplicantAnswer } from 'src/applicants/entity/applicant-answer.entity';
import { Option } from 'src/question-bank/entity/option.entity';
import { ApplicantQuestionService } from './applicant-questions.service';
import { ApplicantQuestionController } from './applicant-questions.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ApplicantQuestion,
      ApplicantAnswer,
      Option,
    ]),
  ],
  controllers: [ApplicantQuestionController],
  providers: [ApplicantQuestionService],
})
export class ApplicantQuestionModule {}
