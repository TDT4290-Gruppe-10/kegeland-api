import { MinLength } from 'class-validator';

import { LoginCredentials } from './login-credentials.dto';

export class RegisterCredentials extends LoginCredentials {
  @MinLength(6)
  password: string;
}
