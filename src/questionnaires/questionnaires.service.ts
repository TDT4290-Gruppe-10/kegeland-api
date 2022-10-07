import { Injectable } from '@nestjs/common';
import { FirebaseService } from 'src/firebase/firebase.service';

import { QuestionnairesDTO } from './dto/questionnaires.dto';

@Injectable()
export class QuestionnairesService {
  constructor(private readonly firebaseService: FirebaseService) {}
  getQuestion(): string {
    return 'Hello World';
  }

  getQuestionnaires(): string {
    return 'Hala World!';
  }

  async createQuestionnaire(data: QuestionnairesDTO) {
    console.log(data);
    await this.firebaseService.firestore.collection('questions').add(data);
    return data;
  }
}
