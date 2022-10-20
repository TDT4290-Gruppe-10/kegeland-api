import { ArrayMinSize, IsArray, IsString } from 'class-validator';

export default class AnswersDTO {
  @IsString()
  userId: string;
  @IsArray()
  @ArrayMinSize(1)
  answers: number[];
}
