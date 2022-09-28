import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginCredentials {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
