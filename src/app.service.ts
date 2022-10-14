import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import firebaseConfig from './config/firebase.config';
import { FirebaseService } from './firebase/firebase.service';

type SessionData = {
  _id: string
  sensor_id: string
  user_id: string
  dataPoints: Array<Array<string|number>>
}


@Injectable()
export class AppService {
  constructor(
    @Inject(firebaseConfig.KEY)
    private readonly config: ConfigType<typeof firebaseConfig>,
    private readonly httpService: HttpService,
    private readonly firebaseService: FirebaseService,
  ) {}
  
  getHello(): string {
    return 'Hello World!';
  }

  getHalla(): string {
    return 'Hala World!';
  }

  async addSensorData(data: any): Promise<boolean> {
    const docRef = await this.firebaseService.firestore
      .collection("sessions").add(data).catch((err) => console.log(err))
    return !!docRef
  }

  async getSensorData(uid: any): Promise<any> {
    const snapshot = await this.firebaseService.firestore.collection("sessions").where("user_id", "==", uid).get()
    const docs =  snapshot.docs.map(doc => doc.data());
    return docs
  }

  async getAllSensorData(sensorName: string): Promise<any> {
    const snapshot = await this.firebaseService.firestore.collection("sessions").where("sensor", "==", sensorName).get()
    const docs =  snapshot.docs.map(doc => doc.data());
    return docs
  }
}
