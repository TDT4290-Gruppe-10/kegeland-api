import { Body, Controller, Get, Post } from '@nestjs/common';

import { QuestionnairesDTO } from './dto/questionnaires.dto';
import { QuestionnairesService } from './questionnaires.service';

@Controller('questionnaires')
export class QuestionnairesController {
  constructor(private readonly questionnairesService: QuestionnairesService) {}

  @Get()
  //@ApiBearerAuth('access-token')
  //@UseGuards(FirebaseAuthGuard, RolesGuard)
  //@Roles(Role.PATIENT)
  getQuestion() {
    return this.questionnairesService.getQuestion();
  }

  @Get(':id')
  //@ApiBearerAuth('access-token')
  //@UseGuards(FirebaseAuthGuard, RolesGuard)
  //@Roles(Role.PHYSICIAN)
  getQuestionnaires() {
    return this.getQuestionnaires();
  }

  @Post()
  create(@Body() data: QuestionnairesDTO) {
    return this.questionnairesService.createQuestionnaire(data);
  }
}
