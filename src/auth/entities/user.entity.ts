import { Exclude } from 'class-transformer';
import { ApiHideProperty } from '@nestjs/swagger';

export class UserEntity {
  @Exclude()
  @ApiHideProperty()
  kind: string;
  /**
   * @example 'ola.nordmann@gmail.com'
   */
  email: string;
  /**
   * @example Doofern
   */
  displayName: string | null;
  idToken: string;
  @Exclude()
  @ApiHideProperty()
  registered: boolean;
  refreshToken: string;
  /**
   * The tokens TTL in seconds
   * @example 3600
   */
  expiresIn: number;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
