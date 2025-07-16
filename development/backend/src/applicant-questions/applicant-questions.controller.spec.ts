import { Test, TestingModule } from '@nestjs/testing';
import { ApplicantQuestionsController } from './applicant-questions.controller';

describe('ApplicantQuestionsController', () => {
  let controller: ApplicantQuestionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApplicantQuestionsController],
    }).compile();

    controller = module.get<ApplicantQuestionsController>(ApplicantQuestionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
