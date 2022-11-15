import { Controller, Get, UseGuards } from '@nestjs/common';
import { Redirect } from '@nestjs/common/decorators';
import { ApiBearerAuth } from '@nestjs/swagger';

import { AppService } from './app.service';
import { FirebaseAuthGuard } from './firebase/firebase-auth.guard';
import { Role } from './roles/enums/role.enum';
import { Roles } from './roles/roles.decorator';
import { RolesGuard } from './roles/roles.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  /**
   * Basic call to check that API is live
   * @returns "Hello world!"
   */
  @Get('hello')
  @ApiBearerAuth('access-token')
  @UseGuards(FirebaseAuthGuard, RolesGuard)
  @Roles(Role.PATIENT)
  getHello() {
    return this.appService.getHello();
  }

  /**
   * Endpoint for catching wildcard routes, i.e. non-existing endpoints
   */
  @Get('*')
  @Redirect('/')
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  redirect() {}
}
