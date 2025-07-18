import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SkillsModule } from './skills/skills.module';
import { QuestionBankModule } from './question-bank/question-bank.module';
import { UsersModule } from './users/users.module';
import { TestModule } from './evaluation/evaluation.module';
import { ApplicantQuestionModule } from './applicant-questions/applicant-questions.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'tiger',
      database: 'recruitment',
      autoLoadEntities: true,
      synchronize: true, 
    }),
    UsersModule, 
    SkillsModule,
    QuestionBankModule,
    TestModule,
    ApplicantQuestionModule,
  ],
})
export class AppModule {}
