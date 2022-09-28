import { UserCredential } from 'firebase/auth';

import { UserEntity } from './entities/user.entity';

export interface AuthResponse extends UserCredential {
  _tokenResponse: Partial<UserEntity>;
}
