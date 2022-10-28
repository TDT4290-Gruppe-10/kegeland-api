import { Injectable } from '@nestjs/common';
import { FirebaseService } from 'src/firebase/firebase.service';
import { map } from 'lodash';

import { CreateSensorDto } from './dto/create-sensor.dto';
import { UpdateSensorDto } from './dto/update-sensor.dto';

@Injectable()
export class SensorsService {
  constructor(private readonly firebaseService: FirebaseService) {}

  async findOne(id: string) {
    const snapshot = await this.firebaseService.firestore
      .collection('sensors')
      .doc(id)
      .get();
    return { id: snapshot.id, ...snapshot.data() };
  }

  async findAll() {
    const snapshots = await this.firebaseService.firestore
      .collection('sensors')
      .get();
    return map(snapshots.docs, (doc) => ({ id: doc.id, ...doc.data() }));
  }

  async create(data: CreateSensorDto) {
    await this.firebaseService.firestore
      .collection('sensors')
      .doc(data.name)
      .set(data);
    return { id: data.name, ...data };
  }

  async update(id: string, data: UpdateSensorDto) {
    await this.firebaseService.firestore
      .collection('sensors')
      .doc(id)
      .set(data);
    return { id, ...data };
  }

  async delete(id: string) {
    await this.firebaseService.firestore.collection('sensors').doc(id).delete();
  }
}
