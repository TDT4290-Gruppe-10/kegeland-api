import { NestFactory } from '@nestjs/core';
import { initializeApp } from 'firebase-admin/app';
import { credential } from 'firebase-admin';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService: ConfigService = app.get(ConfigService);

  // Initialize Firestore
  initializeApp({
    credential: credential.cert(
      configService.get<string>('GOOGLE_APPLICATION_CREDENTIALS'),
    ),
  });

  await app.listen(configService.get<number>('SERVER_PORT') || 3000);
}
bootstrap();
