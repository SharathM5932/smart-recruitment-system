import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Question } from 'src/question-bank/entity/question.entity';
import { Option } from 'src/question-bank/entity/option.entity';
import { TestAttempt } from '../../evaluation/entity/test-attempt.entity';
import { Applicant } from '../../evaluation/entity/applicant.entity';

@Entity('applicant_answers')
export class ApplicantAnswer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Applicant)
  @JoinColumn({ name: 'applicant_id' })
  applicant: Applicant;

  @ManyToOne(() => TestAttempt)
  @JoinColumn({ name: 'test_attempt_id' })
  test_attempt: TestAttempt;

  @ManyToOne(() => Question)
  @JoinColumn({ name: 'mcq_question_id' })
  mcq_question: Question;

  @ManyToOne(() => Option)
  @JoinColumn({ name: 'selected_option_id' })
  selected_option: Option;

  @Column({ type: 'timestamp' })
  answered_at: Date;
}
