import { Exclude } from 'class-transformer';
import { ApiHideProperty } from '@nestjs/swagger';

export class UserEntity {
  /**
   * @example 'ola.nordmann@gmail.com'
   */
  email: string;
  /**
   * @example Doofern
   */
  displayName: string | null;
  idToken: string;
  refreshToken: string;
  /**
   * The tokens TTL in seconds
   * @example 3600
   */
  expiresIn: number;

  @Exclude()
  @ApiHideProperty()
  kind: string;

  @Exclude()
  @ApiHideProperty()
  registered: boolean;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
