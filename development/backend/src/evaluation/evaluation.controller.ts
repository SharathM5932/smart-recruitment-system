import { Controller, Post, Body } from '@nestjs/common';
import { TestService } from './evaluation.service';

@Controller('test')
export class TestController {
  constructor(private readonly testService: TestService) {}

  @Post('generate-link')
  async generateLink(@Body() dto: any) {
    return this.testService.generateLink(dto);
  }
}