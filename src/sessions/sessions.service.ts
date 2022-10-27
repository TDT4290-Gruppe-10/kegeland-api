import { Injectable } from '@nestjs/common';
import { map } from 'lodash';
import { FirebaseService } from 'src/firebase/firebase.service';

import { CreateSessionDto } from './dto/create-session.dto';
import { ListSessionsDto } from './dto/list-sessions.dto';
import { UpdateSessionDto } from './dto/update-session.dto';

@Injectable()
export class SessionsService {
  constructor(private readonly firebaseService: FirebaseService) {}

  async findOne(id: string) {
    const snapshot = await this.firebaseService.firestore
      .collection('sessions')
      .doc(id)
      .get();
    return { id: snapshot.id, ...snapshot.data() };
  }

  async findAll(filters: ListSessionsDto) {
    let query: any = this.firebaseService.firestore.collection('sessions');
    if ('sensor' in filters) {
      query = query.where('sensor', '==', filters.sensor);
    }
    const snapshots = await query.get();
    return map(snapshots.docs, (doc) => ({ id: doc.id, ...doc.data() }));
  }

  async create(data: CreateSessionDto) {
    const docRef = await this.firebaseService.firestore
      .collection('sessions')
      .add(data);
    return { id: docRef.id, ...data };
  }

  async update(id: string, data: UpdateSessionDto) {
    await this.firebaseService.firestore
      .collection('sessions')
      .doc(id)
      .set(data);
    return { id, ...data };
  }

  async delete(id: string) {
    await this.firebaseService.firestore
      .collection('sessions')
      .doc(id)
      .delete();
  }
}
