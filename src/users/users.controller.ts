import { Controller, Delete, Get, Param } from '@nestjs/common';

import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Get('patients')
  async findAllPatients() {
    return this.usersService.findAllPatients();
  }

  @Get('overview/:id')
  async getPatientOverview(@Param('id') id: string) {
    return this.usersService.getPatientOverview(id);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.usersService.delete(id);
  }
}
