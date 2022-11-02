import { Injectable } from '@nestjs/common';
import { FirebaseService } from 'src/firebase/firebase.service';

@Injectable()
export class UsersService {
  constructor(private readonly firebaseService: FirebaseService) {}

  async findOne(id: string) {
    const snapshot = await this.firebaseService.firestore
      .collection('userDetails')
      .doc(id)
      .get();
    return { id, ...snapshot.data() };
  }

  async findAllPatients() {
    const snapshot = await this.firebaseService.firestore
      .collection('userDetails')
      .where('roles', 'array-contains', 'patient')
      .get();
    const docs = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return docs;
  }

  async getPatientOverview(uid: string) {
    const sessions = await this.firebaseService.firestore
      .collection('sessions')
      .where('userId', '==', uid)
      .get();
    const sessionsArr = sessions.docs.map((doc) => doc.createTime.toDate());
    const userInfo = await this.firebaseService.firestore
      .collection('userDetails')
      .doc(uid)
      .get();
    const { firstName, lastName } = userInfo.data().name;

    return { name: firstName + ' ' + lastName, sessionDates: sessionsArr };
  }

  async delete(id: string): Promise<void> {
    await this.firebaseService.firestore
      .collection('userDetails')
      .doc(id)
      .delete();
    await this.firebaseService.firebaseAdmin.auth().deleteUser(id);
  }
}
