import { Exclude, Expose, Type } from 'class-transformer';
import { ApiHideProperty } from '@nestjs/swagger';

import { UserDetailsEntity } from './user-details.entity';
import { TokenCredentials } from './token-credentials.entity';

export class UserEntity {
  /**
   * @example 'ola.nordmann@gmail.com'
   */
  @Expose()
  email: string;

  @Expose()
  @Type(() => UserDetailsEntity)
  details: UserDetailsEntity;

  @Expose()
  @Type(() => TokenCredentials)
  tokens: TokenCredentials;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
