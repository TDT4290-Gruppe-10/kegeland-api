import {
  Controller,
  Get,
  Param,
} from '@nestjs/common';

import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('get-all-patients')
  async getAllPatients() {
    return this.usersService.getAllPatients();
  }

  @Get(':id')
  async getPatient(@Param('id') id: string) {
    return this.usersService.getPatient(id);
  }

  @Get('overview/:id')
  async getPatientOverview(@Param('id') id: string) {
    return this.usersService.getPatientOverview(id);
  }
}
