// import { initializeApp } from 'firebase-admin/app';

// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {config} from "dotenv"

config()

// var firebaseConfig = {
//     apiKey: process.env.FIREBASE_API_KEY, 
//     authDomain: process.env.FIREBASE_AUTH_DOMAIN,
//     projectId: process.env.FIREBASE_PROJECT_ID, 
//     storageBucket: process.env.FIREBASE_STORAGE_BUCKET, 
//     messagingSenderId: process.env.FIREBASE_MESSAGE_ID,
//     appId: process.env.FIREBASE_APP_ID,
//     measurementId: process.env.FIREBASE_MEASUREMENT_ID,
// };

// const firebaseClient = initializeApp(firebaseConfig);
// export const analytics = getAnalytics(firebaseClient);

// export default firebaseClient

import { applicationDefault, initializeApp } from 'firebase-admin/app';
import {getFirestore} from 'firebase-admin/firestore';

initializeApp({
    credential: applicationDefault(),
    databaseURL: 'https://kegeland-dev.firebaseio.com'
});

const firebaseClient = getFirestore()

export default firebaseClient