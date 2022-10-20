import { Body, Controller, Get, Post } from '@nestjs/common';
import { Param, Query } from '@nestjs/common/decorators';

import AnswersDTO from './dto/answers.dto';
import AssignQuestionnaireDTO from './dto/assign-questionnaire.dto';
import GetAssignedQuestionnaireDTO from './dto/get-assigned-questionnaire.dto';
import ListAnswersDTO from './dto/list-answers.dto';
import ListQuestionnairesDTO from './dto/list-questionnaires.dto';
import { QuestionnairesDTO } from './dto/questionnaires.dto';
import { QuestionnairesService } from './questionnaires.service';

@Controller('questionnaires')
export class QuestionnairesController {
  constructor(private readonly questionnairesService: QuestionnairesService) {}

  @Post('assignments')
  assignQuestionnaire(@Body() data: AssignQuestionnaireDTO) {
    return this.questionnairesService.assignQuestionnaire(data);
  }

  @Get('assignments/:userId')
  getAssignedQuestionnaire(
    @Param('userId') userId: string,
    @Query() filters: GetAssignedQuestionnaireDTO,
  ) {
    return this.questionnairesService.getAssignedQuestionnaire(userId, filters);
  }

  @Get()
  listQuestionnaires(@Query() filters: ListQuestionnairesDTO) {
    return this.questionnairesService.listQuestionnaires(filters);
  }

  @Get(':id')
  getQuestionnaire(@Param('id') id: string) {
    return this.questionnairesService.getQuestionnaire(id);
  }

  @Post()
  createQuestionnaire(@Body() data: QuestionnairesDTO) {
    return this.questionnairesService.createQuestionnaire(data);
  }

  @Get(':questionaireId/answers')
  listAnswers(
    @Param('questionaireId') qid: string,
    @Query() filters: ListAnswersDTO,
  ) {
    return this.questionnairesService.listAnswers(qid, filters);
  }

  @Get(':questionaireId/answers/:id')
  getAnswer(@Param('questionaireId') qid: string, @Param('id') id: string) {
    return this.questionnairesService.getAnswer(qid, id);
  }

  @Post(':questionaireId/answers')
  createAnswers(
    @Param('questionaireId') qid: string,
    @Body() data: AnswersDTO,
  ) {
    return this.questionnairesService.createAnswer(qid, data);
  }
}
