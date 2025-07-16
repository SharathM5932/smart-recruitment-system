import { IsBoolean, IsString } from 'class-validator';

export class CreateOptionDto {
  @IsString()
  option_text: string;

  @IsBoolean()
  is_correct: boolean;
}
