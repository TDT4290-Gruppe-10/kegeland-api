import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginCredentialsDTO {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
