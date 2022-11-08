import { Module } from '@nestjs/common';
import { FirebaseProviderMock } from 'src/__mocks__/firebaseMock';

import { QuestionnairesController } from './questionnaires.controller';
import { QuestionnairesService } from './questionnaires.service';

@Module({
  imports: [],
  controllers: [QuestionnairesController],
  providers: [QuestionnairesService, FirebaseProviderMock],
})
export class QuestionnairesModule {}
