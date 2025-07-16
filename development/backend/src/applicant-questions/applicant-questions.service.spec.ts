import { Test, TestingModule } from '@nestjs/testing';
import { ApplicantQuestionsService } from './applicant-questions.service';

describe('ApplicantQuestionsService', () => {
  let service: ApplicantQuestionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApplicantQuestionsService],
    }).compile();

    service = module.get<ApplicantQuestionsService>(ApplicantQuestionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
