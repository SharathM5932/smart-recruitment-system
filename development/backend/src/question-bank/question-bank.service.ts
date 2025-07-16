import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question } from './entity/question.entity';
import { Skill } from 'src/skills/entity/skill.entity';
import { User } from 'src/users/entity/user.entity';
import { CreateQuestionDto } from './dto/create-question.dto';
import { Option } from './entity/option.entity';
import { UpdateQuestionDto } from './dto/update-question.dto';

@Injectable()
export class QuestionBankService {
  constructor(
    @InjectRepository(Question)
    private questionRepo: Repository<Question>,

    @InjectRepository(Skill)
    private skillRepo: Repository<Skill>,

    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) { }

  async create(dto: CreateQuestionDto): Promise<Question> {
    const skill = await this.skillRepo.findOneBy({ id: dto.skill_id });
    const creator = await this.userRepo.findOneBy({ id: dto.created_by });

    if (!skill || !creator) {
      throw new NotFoundException('Skill or User not found');
    }

    const options: Option[] = dto.options.map((opt) => {
      const option = new Option();
      option.option_text = opt.option_text;
      option.is_correct = opt.is_correct;
      return option;
    });

    const question = this.questionRepo.create({
      question_text: dto.question_text,
      difficulty: dto.difficulty,
      skill,
      created_by: creator,
      options,
    });

    return this.questionRepo.save(question);
  }

  async findAll(): Promise<Question[]> {
    return this.questionRepo.find({
      relations: ['skill', 'created_by'],
    });
  }

  async update(id: string, dto: UpdateQuestionDto): Promise<Question> {
    const question = await this.questionRepo.findOne({
      where: { id },
      relations: ['options'],
    });

    if (!question) throw new NotFoundException('Question not found');


    if (dto.question_text) question.question_text = dto.question_text;
    if (dto.difficulty) question.difficulty = dto.difficulty;

    if (dto.skill_id) {
      const skill = await this.skillRepo.findOneBy({ id: dto.skill_id });
      if (!skill) throw new NotFoundException('Skill not found');
      question.skill = skill;
    }

    if (dto.created_by) {
      const user = await this.userRepo.findOneBy({ id: dto.created_by });
      if (!user) throw new NotFoundException('User not found');
      question.created_by = user;
    }

    if (dto.options) {
      question.options = dto.options.map((opt) => ({
        ...opt,
      })) as any; 
    }

    return this.questionRepo.save(question);
  }

  async remove(id: string): Promise<void> {
    const question = await this.questionRepo.findOne({ where: { id } });
    if (!question) throw new NotFoundException('Question not found');
    await this.questionRepo.remove(question);
  }

}
