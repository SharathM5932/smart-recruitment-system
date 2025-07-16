import { IsUUID, IsIn, IsString, ValidateNested, ArrayMinSize } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateOptionDto } from './create-option.dto';

export class CreateQuestionDto {
  @IsUUID()
  skill_id: string;

  @IsUUID()
  created_by: string;

  @IsString()
  question_text: string;

  @IsIn(['easy', 'medium', 'hard'])
  difficulty: 'easy' | 'medium' | 'hard';

  @ValidateNested({ each: true })
  @Type(() => CreateOptionDto)
  @ArrayMinSize(2)
  options: CreateOptionDto[];
}
