import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api');
  const config = new DocumentBuilder()
    .setTitle('Kegeland API')
    .setDescription('Api-services for NTNU Physiotherapy')
    .setVersion('1.0')
    .addBearerAuth(
      {
        description: `Please enter your access-token`,
        name: 'Authorization',
        bearerFormat: 'Bearer',
        scheme: 'Bearer',
        type: 'http',
        in: 'Header',
      },
      'access-token',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api/docs', app, document);
  const configService: ConfigService = app.get(ConfigService);

  await app.listen(configService.get<number>('SERVER_PORT') || 3000);
}
bootstrap();
