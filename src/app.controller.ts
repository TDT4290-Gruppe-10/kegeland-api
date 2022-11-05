import { Controller, Get, UseGuards } from '@nestjs/common';
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
}
