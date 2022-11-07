import { registerAs } from '@nestjs/config';

/**
 * Configuration for firebase connection
 */
export default registerAs('firebase', () => ({
  admin: {
    credPath: process.env.GOOGLE_APPLICATION_CREDENTIALS,
  },
  sdk: {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID,
  },
}));
