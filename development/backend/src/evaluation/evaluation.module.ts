import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EvaluationService } from './evaluation.service';
import { EvaluationController } from './evaluation.controller';
import { Applicant } from './entity/applicant.entity';
import { Skill } from 'src/skills/entity/skill.entity'; 
import { Question } from 'src/question-bank/entity/question.entity';
import { TestAttempt } from './entity/test-attempt.entity';
import { TestAccessToken } from './entity/test-access-token.entity';
import { ApplicantQuestion } from 'src/applicant-questions/entity/applicant_questions.entity';
import { Job } from 'src/jobs/entity/jobs.entity';
import { SendMailService } from 'src/mailer/mailer.service';
import { ExperienceLevel } from './entity/experience_levels.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Applicant,
      Skill, 
      Question,
      TestAttempt,
      TestAccessToken,
      ApplicantQuestion,
      ExperienceLevel,
      Job,
    ]),
  ],
  controllers: [EvaluationController],
  providers: [EvaluationService, SendMailService],
})
export class TestModule {}
