import { Body, Controller, Get, Post } from '@nestjs/common';
import { Param } from '@nestjs/common/decorators';
import { IdParam } from 'types';

import { QuestionnairesDTO } from './dto/questionnaires.dto';
import { QuestionnairesService } from './questionnaires.service';

@Controller('questionnaires')
export class QuestionnairesController {
  constructor(private readonly questionnairesService: QuestionnairesService) {}

  @Get()
  getQuestion(@Param() params: IdParam) {
    const { id } = params;
    // add id to '()'
    return this.questionnairesService.getQuestion();
  }

  @Get(':id')
  getQuestionnaires(@Param() params: IdParam) {
    const { id } = params;
    //todo make serializer of ID
    //global tyoe for id param
    return this.questionnairesService.getQuestionnaires(id);
  }

  @Post()
  create(@Body() data: QuestionnairesDTO) {
    return this.questionnairesService.createQuestionnaire(data);
  }
}
