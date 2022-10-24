import { IsOptional, IsString } from 'class-validator';

export default class ListAnswersDTO {
  @IsOptional()
  @IsString()
  userId?: string;
  @IsOptional()
  @IsString()
  sessionId?: string;
}
