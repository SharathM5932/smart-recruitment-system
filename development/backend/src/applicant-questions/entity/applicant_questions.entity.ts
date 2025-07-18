import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Applicant } from 'src/evaluation/entity/applicant.entity';
import { Question } from 'src/question-bank/entity/question.entity';
import { TestAttempt } from 'src/evaluation/entity/test-attempt.entity';

@Entity('applicant_questions')
export class ApplicantQuestion {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Applicant, { eager: false })
  @JoinColumn({ name: 'applicant_id' })
  applicant: Applicant;

  @ManyToOne(() => Question, { eager: true })
  @JoinColumn({ name: 'mcq_question_id' })
  mcq_question: Question;

  @ManyToOne(() => TestAttempt, { eager: false })
  @JoinColumn({ name: 'test_attempt_id' })
  test_attempt: TestAttempt;
}