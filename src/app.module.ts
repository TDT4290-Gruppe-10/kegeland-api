import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { FirebaseModule } from './firebase/firebase.module';
import { FirebaseAuthStrategy } from './firebase/firebase-auth.strategy';
import { UsersModule } from './users/users.module';
import firebaseConfig from './config/firebase.config';
import { QuestionnairesModule } from './questionnaires/questionnaires.module';
import { SensorsModule } from './sensors/sensors.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [firebaseConfig],
    }),
    FirebaseModule,
    AuthModule,
    QuestionnairesModule,
    SensorsModule,
    UsersModule
  ],
  controllers: [AppController],
  providers: [AppService, FirebaseAuthStrategy],
})
export class AppModule {}
