import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';

import { AppService } from './app.service';
import { FirebaseAuthGuard } from './firebase/firebase-auth.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiBearerAuth('access-token')
  @UseGuards(FirebaseAuthGuard)
  getHello() {
    return this.appService.getHello();
  }
}
