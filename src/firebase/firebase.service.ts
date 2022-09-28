import { OnModuleInit, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as admin from 'firebase-admin';
import { FirebaseApp } from 'firebase/app';

@Injectable()
export class FirebaseService implements OnModuleInit {
  public firebaseAdmin: admin.app.App;
  public firestore: admin.firestore.Firestore;
  public firebase: FirebaseApp;

  constructor(private readonly configService: ConfigService) {}

  onModuleInit() {
    // Initialize the admin-sdk
    this.firebaseAdmin = admin.initializeApp({
      credential: admin.credential.cert(
        this.configService.get<string>('GOOGLE_APPLICATION_CREDENTIALS'),
      ),
    });

    // Initialize firestore client
    this.firestore = admin.firestore(this.firebaseAdmin);
  }
}
