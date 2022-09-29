import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';

export class RefreshToken {
  @Expose()
  @IsString()
  refreshToken: string;
}
