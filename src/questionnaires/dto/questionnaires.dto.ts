import { Type } from 'class-transformer';
import { IsString, ValidateNested } from 'class-validator';

export class QuestionField {
  @IsString()
  title: string;
  @IsString()
  minVal: string;
  @IsString()
  maxVal: string;
}

export class QuestionnairesDTO {
  @IsString()
  name: string;

  @ValidateNested()
  @Type(() => QuestionField)
  questions: QuestionField[];
}
