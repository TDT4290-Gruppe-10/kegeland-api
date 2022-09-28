import {
  Post,
  Controller,
  Body,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { LoginCredentials } from './dto/login-credentials.dto';
import { RegisterCredentials } from './dto/register-credentials.dto';
import { UserEntity } from './entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('login')
  login(@Body() loginCredentials: LoginCredentials) {
    return this.authService
      .login(loginCredentials)
      .then((res) => new UserEntity(res._tokenResponse));
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('register')
  register(@Body() registerCredentials: RegisterCredentials) {
    return this.authService
      .register(registerCredentials)
      .then((res) => new UserEntity(res._tokenResponse));
  }
}
