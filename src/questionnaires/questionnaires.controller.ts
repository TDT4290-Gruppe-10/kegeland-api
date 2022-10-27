import { Body, Controller, Get, Post } from '@nestjs/common';
import { Delete, Param, Put, Query } from '@nestjs/common/decorators';

import { AssignQuestionnaireDto } from './dto/assign-questionnaire.dto';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { CreateQuestionnaireDto } from './dto/create-questionnaire.dto';
import { FindAnswersDto } from './dto/find-answers.dto';
import { FindQuestionnairesDto } from './dto/find-questionnaires.dto';
import { GetAssignedQuestionnaireDto } from './dto/get-assigned-questionnaire.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { UpdateQuestionnaireDto } from './dto/update-questionnaire.dto';
import { QuestionnairesService } from './questionnaires.service';

@Controller('questionnaires')
export class QuestionnairesController {
  constructor(private readonly questionnairesService: QuestionnairesService) {}

  @Post('assignments')
  assignQuestionnaire(@Body() data: AssignQuestionnaireDto) {
    return this.questionnairesService.assignQuestionnaire(data);
  }

  @Get('assignments/:userId')
  getAssignedQuestionnaire(
    @Param('userId') userId: string,
    @Query() filters: GetAssignedQuestionnaireDto,
  ) {
    return this.questionnairesService.getAssignedQuestionnaire(userId, filters);
  }

  @Get()
  findAllQuestionnaires(@Query() filters: FindQuestionnairesDto) {
    return this.questionnairesService.findAllQuestionnaires(filters);
  }

  @Get(':id')
  findOneQuestionnaire(@Param('id') id: string) {
    return this.questionnairesService.findOneQuestionnaire(id);
  }

  @Post()
  createQuestionnaire(@Body() data: CreateQuestionnaireDto) {
    return this.questionnairesService.createQuestionnaire(data);
  }

  @Put(':id')
  updateQuestionnaire(@Param('id') id: string, data: UpdateQuestionnaireDto) {
    return this.questionnairesService.updateQuestionnaire(id, data);
  }

  @Delete(':id')
  deleteQuestionnaire(@Param('id') id: string) {
    return this.questionnairesService.deleteQuestionnaire(id);
  }

  @Get(':questionaireId/answers')
  findAllAnswers(
    @Param('questionaireId') qid: string,
    @Query() filters: FindAnswersDto,
  ) {
    return this.questionnairesService.findAllAnswers(qid, filters);
  }

  @Get(':questionaireId/answers/:id')
  findOneAnswer(@Param('questionaireId') qid: string, @Param('id') id: string) {
    return this.questionnairesService.getAnswer(qid, id);
  }

  @Post(':questionaireId/answers')
  createAnswer(
    @Param('questionaireId') qid: string,
    @Body() data: CreateAnswerDto,
  ) {
    return this.questionnairesService.createAnswer(qid, data);
  }

  @Put(':questionaireId/answers/:id')
  updateAnswer(
    @Param('questionaireId') qid: string,
    @Param('id') id: string,
    data: UpdateAnswerDto,
  ) {
    return this.questionnairesService.updateAnswer(qid, id, data);
  }

  @Delete(':questionaireId/answers/:id')
  deleteAnswer(@Param('questionaireId') qid: string, @Param('id') id: string) {
    return this.questionnairesService.deleteAnswer(qid, id);
  }
}
