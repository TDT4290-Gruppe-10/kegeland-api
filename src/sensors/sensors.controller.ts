import { Controller, Get, Post, Body, Param } from '@nestjs/common';

import { SensorsService } from './sensors.service';
import { CreateSessionDto } from './dto/create-sensor.dto';

@Controller('sensors')
export class SensorsController {
  constructor(private readonly sensorsService: SensorsService) {}

  @Get('sessions/:uid/:sensorName')
  async getSessionData(
    @Param('uid') uid: string,
    @Param('sensorName') sensorName: string,
  ) {
    return this.sensorsService.getSessions(uid, sensorName);
  }

  @Get('sessions/:uid/')
  async getAllUserSessions(@Param('uid') uid: string) {
    return this.sensorsService.getAllUserSessions(uid);
  }

  @Post('add-session')
  async addSession(@Body() body: CreateSessionDto): Promise<boolean> {
    return this.sensorsService.addSession(body);
  }

  @Get('session/:sessionId')
  async getSessionDataById(@Param('sessionId') sessionId: string) {
    return this.sensorsService.getSessionDataById(sessionId);
  }
}
