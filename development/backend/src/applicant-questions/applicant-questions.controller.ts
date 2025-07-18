import { Controller, Get, Query } from '@nestjs/common';
import { ApplicantQuestionService } from './applicant-questions.service';

@Controller('applicant-questions')
export class ApplicantQuestionController {
    constructor(private readonly aqService: ApplicantQuestionService) { }
    @Get()
    async getQuestions(
        @Query('applicantId') applicantId: string,
        @Query('attemptId') attemptId: string,
    ) {
        // Trim values to remove \n, extra spaces, etc.
        return this.aqService.getQuestionsByApplicantAndAttempt(
            applicantId.trim(),
            attemptId.trim()
        );
    }

}
