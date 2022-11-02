import { NotFoundException, Injectable } from '@nestjs/common';
import { map } from 'lodash';
import { FirebaseService } from 'src/firebase/firebase.service';

import { AssignQuestionnaireDto } from './dto/assign-questionnaire.dto';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { CreateQuestionnaireDto } from './dto/create-questionnaire.dto';
import { FindAnswersDto } from './dto/find-answers.dto';
import { FindQuestionnairesDto } from './dto/find-questionnaires.dto';
import { GetAssignedQuestionnaireDto } from './dto/get-assigned-questionnaire.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { UpdateQuestionnaireDto } from './dto/update-questionnaire.dto';

@Injectable()
export class QuestionnairesService {
  constructor(private readonly firebaseService: FirebaseService) {}

  async assignQuestionnaire(data: AssignQuestionnaireDto) {
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
    filters: GetAssignedQuestionnaireDto,
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

  async findAllQuestionnaires(filters: FindQuestionnairesDto) {
    let query: any = this.firebaseService.firestore.collection('questions');
    if ('sensor' in filters) {
      query = query.where('sensor', '==', filters.sensor);
    }
    const snapshots = await query.get();
    return map(snapshots.docs, (doc) => ({ id: doc.id, ...doc.data() }));
  }

  async findOneQuestionnaire(id: string) {
    const snapshot = await this.firebaseService.firestore
      .collection('questions')
      .doc(id)
      .get();
    return { id: snapshot.id, ...snapshot.data() };
  }

  async createQuestionnaire(data: CreateQuestionnaireDto) {
    const doc = await this.firebaseService.firestore
      .collection('questions')
      .add(data);

    return { id: doc.id, ...data };
  }

  async updateQuestionnaire(id: string, data: UpdateQuestionnaireDto) {
    await this.firebaseService.firestore
      .collection('questions')
      .doc(id)
      .set(data);
    return { id, ...data };
  }

  async deleteQuestionnaire(id: string) {
    await this.firebaseService.firestore
      .collection('questions')
      .doc(id)
      .delete();
  }

  async findAllAnswers(qid: string, filters: FindAnswersDto) {
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
    return snapshots.docs.map((doc) => ({
      id: doc.id,
      createdAt: doc.createTime.seconds,
      ...doc.data(),
    }));
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

  async createAnswer(qid: string, data: CreateAnswerDto) {
    const doc = await this.firebaseService.firestore
      .collection('questions')
      .doc(qid)
      .collection('answers')
      .add({
        ...data,
      });

    return { id: doc.id, ...data };
  }

  async updateAnswer(qid: string, id: string, data: UpdateAnswerDto) {
    await this.firebaseService.firestore
      .collection('questions')
      .doc(qid)
      .collection('answers')
      .doc(id)
      .set(data);
    return { id, ...data };
  }

  async deleteAnswer(qid: string, id: string) {
    await this.firebaseService.firestore
      .collection('questions')
      .doc(qid)
      .collection('answers')
      .doc(id)
      .delete();
  }
}
