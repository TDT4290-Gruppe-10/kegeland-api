import { Injectable } from '@nestjs/common';
import { map } from 'lodash';
import { FirebaseService } from 'src/firebase/firebase.service';

import { timestamp } from '../utils/timestamp';

import { CreateSessionDto } from './dto/create-session.dto';
import { ListSessionsDto, SessionListItem } from './dto/list-sessions.dto';
import { UpdateSessionDto } from './dto/update-session.dto';
import { Session } from './entities/session.entity';

@Injectable()
export class SessionsService {
  constructor(private readonly firebaseService: FirebaseService) {}

  async findOne(id: string): Promise<Session> {
    const snapshot = await this.firebaseService.firestore
      .collection('sessions')
      .doc(id)
      .get();
    return {
      id: snapshot.id,
      ...snapshot.data(),
    } as Session;
  }

  async findAll(filters: ListSessionsDto): Promise<SessionListItem[]> {
    let query: any = this.firebaseService.firestore.collection('sessions');
    if ('sensor' in filters) {
      query = query.where('sensor', '==', filters.sensor);
    }
    if ('userId' in filters) {
      query = query.where('userId', '==', filters.userId);
    }
    const snapshots = await query.orderBy('createdAt', 'desc').get();
    return map(snapshots.docs, (doc) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { data, ...spread } = doc.data();
      return {
        id: doc.id,
        ...spread,
      };
    });
  }

  async create(data: CreateSessionDto): Promise<Session> {
    const ts = timestamp();
    const docRef = await this.firebaseService.firestore
      .collection('sessions')
      .add({ ...data, createdAt: ts });
    return { id: docRef.id, ...data, createdAt: ts };
  }

  async update(id: string, data: UpdateSessionDto): Promise<Partial<Session>> {
    await this.firebaseService.firestore
      .collection('sessions')
      .doc(id)
      .set(data, { merge: true });
    return { id, ...data };
  }

  async delete(id: string): Promise<void> {
    await this.firebaseService.firestore
      .collection('sessions')
      .doc(id)
      .delete();
  }
}
