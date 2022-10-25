import { NotFoundException, Injectable } from '@nestjs/common';
import { map } from 'lodash';
import { FirebaseService } from 'src/firebase/firebase.service';

import AnswersDTO from './dto/answers.dto';
import AssignQuestionnaireDTO from './dto/assign-questionnaire.dto';
import GetAssignedQuestionnaireDTO from './dto/get-assigned-questionnaire.dto';
import ListAnswersDTO from './dto/list-answers.dto';
import ListQuestionnairesDTO from './dto/list-questionnaires.dto';
import { QuestionnairesDTO } from './dto/questionnaires.dto';

@Injectable()
export class QuestionnairesService {
  constructor(private readonly firebaseService: FirebaseService) {}

  async assignQuestionnaire(data: AssignQuestionnaireDTO) {
    const { userId, sensor, questionnaireId } = data;
    await this.firebaseService.firestore
      .collection('userDetails')
      .doc(userId)
      .collection('questionnaires')
      .doc(sensor)
      .set({
        questionnaireId,
      });
    return data;
  }

  async getAssignedQuestionnaire(
    userId: string,
    filters: GetAssignedQuestionnaireDTO,
  ) {
    const { sensor } = filters;
    const ref = await this.firebaseService.firestore
      .collection('userDetails')
      .doc(userId)
      .collection('questionnaires')
      .doc(sensor)
      .get();

    try {
      const snapshot = await this.firebaseService.firestore
        .collection('questions')
        .doc(ref.data().questionnaireId)
        .get();
      return { id: snapshot.id, ...snapshot.data() };
    } catch (err) {
      throw new NotFoundException();
    }
  }

  async listQuestionnaires(filters: ListQuestionnairesDTO) {
    let query: any = this.firebaseService.firestore.collection('questions');
    if ('sensor' in filters) {
      query = query.where('sensor', '==', filters.sensor);
    }
    const snapshots = await query.get();
    return map(snapshots.docs, (doc) => ({ id: doc.id, ...doc.data() }));
  }

  async getQuestionnaire(id: string) {
    const snapshot = await this.firebaseService.firestore
      .collection('questions')
      .doc(id)
      .get();
    return { id: snapshot.id, ...snapshot.data() };
  }

  async createQuestionnaire(data: QuestionnairesDTO) {
    const doc = await this.firebaseService.firestore
      .collection('questions')
      .add(data);

    return { id: doc.id, ...data };
  }

  async listAnswers(qid: string, filters: ListAnswersDTO) {
    let query: any = this.firebaseService.firestore
      .collection('questions')
      .doc(qid)
      .collection('answers');
    if ('userId' in filters) {
      query = query.where('userId', '==', filters.userId);
    }
    if ('sessionId' in filters) {
      query = query.where('sessionId', '==', filters.sessionId);
    }
    const snapshots = await query.get();
    return map(snapshots.docs, (doc) => ({ id: doc.id, ...doc.data() }));
  }

  async getAnswer(qid: string, id: string) {
    const snapshot = await this.firebaseService.firestore
      .collection('questions')
      .doc(qid)
      .collection('answers')
      .doc(id)
      .get();
    return { id: snapshot.id, ...snapshot.data() };
  }

  async createAnswer(qid: string, data: AnswersDTO) {
    const doc = await this.firebaseService.firestore
      .collection('questions')
      .doc(qid)
      .collection('answers')
      .add({
        ...data,
      });

    return { id: doc.id, ...data };
  }
}
