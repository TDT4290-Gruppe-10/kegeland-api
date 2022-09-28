import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  ServiceUnavailableException,
  UnauthorizedException,
} from '@nestjs/common';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import { FirebaseError } from 'firebase/app';

import { LoginCredentials } from './dto/login-credentials.dto';
import { RegisterCredentials } from './dto/register-credentials.dto';

@Injectable()
export class AuthService {
  async login(loginCredentials: LoginCredentials) {
    const { email, password } = loginCredentials;
    const auth = getAuth();
    return signInWithEmailAndPassword(auth, email, password).catch((err) => {
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
      throw new InternalServerErrorException('An unknown error has occurred.');
    });
  }

  async register(registerCredentials: RegisterCredentials) {
    const { email, password } = registerCredentials;
    const auth = getAuth();
    return createUserWithEmailAndPassword(auth, email, password).catch(
      (err) => {
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
      },
    );
  }
}
