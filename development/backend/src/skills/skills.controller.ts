import { Controller, Post, Body, Get } from '@nestjs/common';
import { SkillsService } from './skills.service';
import { CreateSkillDto } from './dto/create-skill.dto';
import { Skill } from './entity/skill.entity';

@Controller('skills')
export class SkillsController {
  constructor(private readonly skillsService: SkillsService) {}

  @Post()
  create(@Body() dto: CreateSkillDto): Promise<Skill> {
    return this.skillsService.create(dto);
  }

  @Get()
  findAll(): Promise<Skill[]> {
    return this.skillsService.findAll();
  }
}
