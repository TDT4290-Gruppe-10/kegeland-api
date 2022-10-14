import { Inject, Injectable } from '@nestjs/common';
import firebaseConfig from 'src/config/firebase.config';
import { FirebaseService } from 'src/firebase/firebase.service';

import { QuestionnairesDTO } from './dto/questionnaires.dto';

@Injectable()
export class QuestionnairesService {
  constructor(
    @Inject(firebaseConfig.KEY)
    private readonly firebaseService: FirebaseService,
  ) {}
  async getQuestion() {
    const snapshot = await this.firebaseService.firestore
      .collection('questions')
      .get();
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    //return 'Hello World';
  }

  //finne doc basert på id DONE
  //firestore how to get document based on ID DONE
  async getQuestionnaires(id: string) {
    const doc = await this.firebaseService.firestore
      .collection('questions')
      .doc(id)
      .get();
    return { id: doc.id, ...doc.data() };
    //return 'Halla World!';
  }

  async createQuestionnaire(data: QuestionnairesDTO) {
    console.log(data);
    await this.firebaseService.firestore.collection('questions').add(data);
    return data;
  }
}
