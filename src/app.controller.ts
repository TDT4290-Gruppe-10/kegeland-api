import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';

import { AppService } from './app.service';
import { FirebaseAuthGuard } from './firebase/firebase-auth.guard';
import { Role } from './roles/enums/role.enum';
import { Roles } from './roles/roles.decorator';
import { RolesGuard } from './roles/roles.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('hello')
  @ApiBearerAuth('access-token')
  @UseGuards(FirebaseAuthGuard, RolesGuard)
  @Roles(Role.PATIENT)
  getHello() {
    return this.appService.getHello();
  }

  @Get('halla')
  @ApiBearerAuth('access-token')
  @UseGuards(FirebaseAuthGuard, RolesGuard)
  @Roles(Role.PHYSICIAN)
  getHalla() {
    return this.appService.getHalla();
  }

  @Post('add-session-data')
  async addData(@Body() body: any) : Promise<boolean> {
    return this.appService.addSensorData(body)
  }

  @Get("session-data/:uid")
  async getSessionData(@Param("uid") uid) {
    
    return this.appService.getSensorData(uid)
  }
}
