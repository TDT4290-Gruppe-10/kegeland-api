import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  ServiceUnavailableException,
  UnauthorizedException,
  Inject,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import { FirebaseError } from 'firebase/app';
import firebaseConfig from 'src/config/firebase.config';
import { ConfigType } from '@nestjs/config';

import { isAxiosError } from '../utils/isAxiosError';

import { LoginCredentials } from './dto/login-credentials.dto';
import { RegisterCredentials } from './dto/register-credentials.dto';
import { AuthResponse, RefreshErrorResponse } from './auth.interface';
import { RefreshToken } from './dto/refresh-token.dto';
import { TokenCredentials } from './entities/token-credentials.entity';

@Injectable()
export class AuthService {
  constructor(
    @Inject(firebaseConfig.KEY)
    private readonly config: ConfigType<typeof firebaseConfig>,
    private readonly httpService: HttpService,
  ) {}

  async login(loginCredentials: LoginCredentials) {
    const { email, password } = loginCredentials;
    const auth = getAuth();
    return signInWithEmailAndPassword(auth, email, password)
      .then((res) => res as AuthResponse)
      .catch((err) => {
        if (err instanceof FirebaseError) {
          switch (err.code) {
            case 'auth/invalid-email':
              throw new BadRequestException('This email is already in use.');
            case 'auth/user-disabled':
              throw new UnauthorizedException('This user has been disabled.');
            case 'auth/user-not-found':
            case 'auth/wrong-password':
              throw new BadRequestException(
                'The email and/or password is invalid.',
              );
          }
        }
        if (err instanceof Error) {
          throw new InternalServerErrorException(err.message);
        }
        throw new InternalServerErrorException(
          'An unknown error has occurred.',
        );
      });
  }

  async register(registerCredentials: RegisterCredentials) {
    const { email, password } = registerCredentials;
    const auth = getAuth();
    return createUserWithEmailAndPassword(auth, email, password)
      .then((res) => res as AuthResponse)
      .catch((err) => {
        if (err instanceof FirebaseError) {
          switch (err.code) {
            case 'auth/email-already-in-use':
              throw new BadRequestException('This email is already in use.');
            case 'auth/invalid-email':
              throw new BadRequestException('This email is invalid.');
            case 'auth/operation-not-allowed':
              throw new ServiceUnavailableException(
                'This operation is not permitted.',
              );
            case 'auth/weak-password':
              throw new BadRequestException(
                'The password must be at least 6 characters.',
              );
          }
        }
        if (err instanceof Error) {
          throw new InternalServerErrorException(err.message);
        }
        throw new InternalServerErrorException(
          'An unknown error has occurred.',
        );
      });
  }

  async refresh({ refreshToken }: RefreshToken) {
    return this.httpService.axiosRef
      .post<TokenCredentials>(
        `https://securetoken.googleapis.com/v1/token?key=${this.config.sdk.apiKey}`,
        {
          grant_type: 'refresh_token',
          refresh_token: refreshToken,
        },
      )
      .then((res) => res.data)
      .catch((err) => {
        if (isAxiosError<RefreshErrorResponse>(err)) {
          const { message } = err.response.data.error;
          switch (message) {
            case 'USER_DISABLED':
              throw new BadRequestException('This user has been disabled.');
            case 'INVALID_REFRESH_TOKEN':
              throw new BadRequestException('Invalid refresh token.');
            case 'TOKEN_EXPIRED':
              throw new BadRequestException('The refresh token has expired.');
            case 'USER_NOT_FOUND':
              throw new BadRequestException(
                'The requested user credentials does not exist.',
              );
          }
        }
        throw new InternalServerErrorException();
      });
  }
}
