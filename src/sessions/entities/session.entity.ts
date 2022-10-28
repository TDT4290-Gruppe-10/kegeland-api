import { IsObject, IsString } from 'class-validator';

export class Session {
  @IsString()
  sensor: string;

  @IsString()
  userId: string;

  @IsObject()
  data: Record<string, number[]>;
}
