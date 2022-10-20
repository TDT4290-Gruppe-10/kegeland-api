import { OnModuleInit, Injectable, Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import * as admin from 'firebase-admin';
import { initializeApp } from 'firebase/app';
import firebaseConfig from 'src/config/firebase.config';

@Injectable()
export class FirebaseService implements OnModuleInit {
  public firebaseAdmin: admin.app.App;
  public firestore: admin.firestore.Firestore;

  constructor(
    @Inject(firebaseConfig.KEY)
    private readonly config: ConfigType<typeof firebaseConfig>,
  ) {}

  onModuleInit() {
    // Initialize the admin-sdk
    this.firebaseAdmin = admin.initializeApp({
      credential: admin.credential.cert(this.config.admin.credPath),
    });
    // Initialize firestore client
    this.firestore = admin.firestore(this.firebaseAdmin);
    // Initialize firebase client
    initializeApp(this.config.sdk);
  }
}
