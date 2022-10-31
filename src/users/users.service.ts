import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import firebaseConfig from 'src/config/firebase.config';
import { FirebaseService } from 'src/firebase/firebase.service';

@Injectable()
export class UsersService {
  constructor(
    @Inject(firebaseConfig.KEY)
    private readonly config: ConfigType<typeof firebaseConfig>,
    private readonly httpService: HttpService,
    private readonly firebaseService: FirebaseService,
  ) {}

  async getAllPatients() {
    const snapshot = await this.firebaseService.firestore
      .collection('userDetails')
      .where('roles', 'array-contains', 'patient')
      .get();
    const docs = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data().name,
    }));
    return docs;
  }

  async getPatient(id: string) {
    const snapshot = await this.firebaseService.firestore
      .collection('userDetails')
      .doc(id)
      .get();
    return snapshot.data();
  }

  async getPatientOverview(uid: string) {
    const sessions = await this.firebaseService.firestore
      .collection('sessions')
      .where('userId', '==', uid)
      .get();
    const sessionsArr = sessions.docs.map((doc) => doc.createTime.toDate())
    const userInfo = await this.firebaseService.firestore
      .collection('userDetails')
      .doc(uid)
      .get();
    const {firstName, lastName} = userInfo.data().name

    return {name: firstName + " " + lastName, sessionDates: sessionsArr};
  }
}
