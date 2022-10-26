import { Injectable, Inject } from '@nestjs/common';
import { CreateSessionDto } from './dto/create-sensor.dto';
import { FirebaseService } from 'src/firebase/firebase.service';
import firebaseConfig from 'src/config/firebase.config';
import { ConfigType } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class SensorsService {
  constructor(
    @Inject(firebaseConfig.KEY)
    private readonly config: ConfigType<typeof firebaseConfig>,
    private readonly httpService: HttpService,
    private readonly firebaseService: FirebaseService,
    ) {}

  async addSession(data: CreateSessionDto): Promise<boolean> {
    const docRef = await this.firebaseService.firestore
      .collection('sessions')
      .add(data)
      .catch((err) => console.log(err));
    return !!docRef;
  }

  async getSessions(uid: string, sensorName: string) {
    const snapshot = await this.firebaseService.firestore
      .collection('sessions')
      .where('user_id', '==', uid)
      .where('sensor', '==', sensorName)
      .get();
    const sensor = await this.getSensor(sensorName)
    let docs = snapshot.docs.map((doc) => ({id: doc.id, date: doc.createTime.toDate()}));
    return {user_id: uid, data:docs, sensor};
  }

  async getSensor(sensorName: string) {
    const snapshot = await this.firebaseService.firestore
      .collection("sensors")
      .where("name", "==", sensorName)
      .get()
      const docs = snapshot.docs.map((doc) => doc.data())
      return docs
      
  }

  async getSessionDataById(sessionId: string) {
    const snapshot = await this.firebaseService.firestore
      .collection("sessions")
      .doc(sessionId)
      .get()
    return snapshot.data()
  }

  async getAllUserSessions(uid: string) {
    const snapshot = await this.firebaseService.firestore
      .collection('sessions')
      .where('user_id', '==', uid)
      .get();
    let docs = snapshot.docs.map((doc) => ({id: doc.id, date: doc.createTime.toDate(), sensor: doc.data().sensor}));
    return {user_id: uid, data: docs};
  }
}
