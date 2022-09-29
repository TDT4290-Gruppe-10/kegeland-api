import { UserCredential } from 'firebase/auth';

import { UserEntity } from './entities/user.entity';

export interface AuthResponse extends UserCredential {
  _tokenResponse: Partial<UserEntity>;
}

export type RefreshErrorResponse = {
  error: {
    message:
      | 'TOKEN_EXPIRED'
      | 'USER_DISABLED'
      | 'USER_NOT_FOUND'
      | 'INVALID_REFRESH_TOKEN';
  };
};
