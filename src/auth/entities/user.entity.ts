import { Exclude } from 'class-transformer';

export class UserEntity {
  @Exclude()
  kind: string;
  email: string;
  displayName: string | null;
  idToken: string;
  @Exclude()
  registered: boolean;
  refreshToken: string;
  expiresIn: number;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
