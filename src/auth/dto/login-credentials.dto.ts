import { Type } from 'class-transformer';
import { ArrayMaxSize, ArrayMinSize, IsArray, IsEmail, IsNotEmpty, IsString, ValidateNested } from 'class-validator';

export class LoginCredentials {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
class SensorDataRow {
  [key: number]: number[]
}

export class SensorDataDto {
  @IsString()
  sensor:string

  @IsString()
  user_id: string

  @ValidateNested({ each: true })
  @Type(() => SensorDataRow)
  dataPoints: SensorDataRow
}

