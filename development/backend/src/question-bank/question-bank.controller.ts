import { Controller, Post, Get, Body } from '@nestjs/common';
import { QuestionBankService } from './question-bank.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { Question } from './entity/question.entity';
import { Param, Put, Delete } from '@nestjs/common';
import { UpdateQuestionDto } from './dto/update-question.dto';


@Controller('question-bank')
export class QuestionBankController {
  constructor(private readonly questionService: QuestionBankService) { }

  @Post()
  create(@Body() dto: CreateQuestionDto): Promise<Question> {
    return this.questionService.create(dto);
  }

  @Get()
  findAll(): Promise<Question[]> {
    return this.questionService.findAll();
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateQuestionDto,
  ): Promise<Question> {
    return this.questionService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.questionService.remove(id);
  }
}
