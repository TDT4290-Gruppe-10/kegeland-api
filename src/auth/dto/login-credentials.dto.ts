import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginCredentialsDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
