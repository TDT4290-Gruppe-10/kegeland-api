import { Exclude, Expose, Transform } from 'class-transformer';
import { ApiHideProperty } from '@nestjs/swagger';

export class TokenCredentials {
  @Expose({ name: 'idToken' })
  id_token: string;
  @Expose({ name: 'refreshToken' })
  refresh_token: string;
  @Expose({ name: 'expiresIn' })
  @Transform(({ value }) => parseInt(value))
  expires_in: number;

  @Exclude()
  @ApiHideProperty()
  access_token: string;
  @Exclude()
  @ApiHideProperty()
  token_type: string;
  @Exclude()
  @ApiHideProperty()
  user_id: string;
  @Exclude()
  @ApiHideProperty()
  project_id: string;

  constructor(partial: Partial<TokenCredentials>) {
    Object.assign(this, partial);
  }
}
