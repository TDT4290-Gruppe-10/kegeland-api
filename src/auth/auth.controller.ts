import { Post, Controller, Body } from '@nestjs/common';

import { AuthService } from './auth.service';
import { LoginCredentials } from './dto/login-credentials.dto';
import { RegisterCredentials } from './dto/register-credentials.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() loginCredentials: LoginCredentials) {
    return this.authService.login(loginCredentials);
  }

  @Post('register')
  register(@Body() registerCredentials: RegisterCredentials) {
    return this.authService.register(registerCredentials);
  }
}
