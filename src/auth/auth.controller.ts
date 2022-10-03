import {
  Post,
  Controller,
  Body,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { LoginCredentialsDTO } from './dto/login-credentials.dto';
import { RefreshTokenDTO } from './dto/refresh-token.dto';
import { RegisterCredentialsDTO } from './dto/register-credentials.dto';
import { ResetPasswordDTO } from './dto/reset-password.dto';
import { TokenCredentials } from './entities/token-credentials.entity';
import { UserEntity } from './entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('login')
  async login(
    @Body() loginCredentials: LoginCredentialsDTO,
  ): Promise<UserEntity> {
    return this.authService.login(loginCredentials);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('register')
  async register(
    @Body() registerCredentials: RegisterCredentialsDTO,
  ): Promise<UserEntity> {
    return this.authService.register(registerCredentials);
  }

  @Post('reset')
  async resetPassword(@Body() reset: ResetPasswordDTO): Promise<void> {
    return this.authService.resetPassword(reset);
  }

  //@UseInterceptors(ClassSerializerInterceptor)
  @Post('refresh')
  async refresh(
    @Body() refreshToken: RefreshTokenDTO,
  ): Promise<TokenCredentials> {
    return this.authService.refresh(refreshToken);
  }
}
