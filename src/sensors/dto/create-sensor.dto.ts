import { IsObject, IsString } from 'class-validator';

class SessionDataRow {
  [key: string]: number[];
}

export class CreateSessionDto {
  @IsString()
  sensor: string;

  @IsString()
  user_id: string;

  @IsObject()
  dataPoints: SessionDataRow;
}
