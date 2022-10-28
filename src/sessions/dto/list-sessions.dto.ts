import { IsOptional, IsString } from 'class-validator';

export class ListSessionsDto {
  @IsOptional()
  @IsString()
  sensor?: string;

  @IsOptional()
  @IsString()
  userId?: string;
}
