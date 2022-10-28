import { ArrayMinSize, IsArray, IsString } from 'class-validator';

export default class Answer {
  @IsString()
  userId: string;
  @IsString()
  sessionId: string;
  @IsArray()
  @ArrayMinSize(1)
  answers: number[];
}
