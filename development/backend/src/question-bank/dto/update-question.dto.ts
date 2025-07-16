import { IsUUID, IsIn, IsString, ValidateNested, IsArray, IsBoolean, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateOptionDto {
  @IsUUID()
  id: string;

  @IsOptional()
  @IsString()
  option_text?: string;

  @IsOptional()
  @IsBoolean()
  is_correct?: boolean;
}

export class UpdateQuestionDto {
  @IsOptional()
  @IsUUID()
  skill_id?: string;

  @IsOptional()
  @IsUUID()
  created_by?: string;

  @IsOptional()
  @IsString()
  question_text?: string;

  @IsOptional()
  @IsIn(['easy', 'medium', 'hard'])
  difficulty?: 'easy' | 'medium' | 'hard';

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateOptionDto)
  options?: UpdateOptionDto[];
}
