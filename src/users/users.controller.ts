import { Controller, Get, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';

import { FirebaseAuthGuard } from '../firebase/firebase-auth.guard';
import { Role } from '../roles/enums/role.enum';
import { Roles } from '../roles/roles.decorator';
import { RolesGuard } from '../roles/roles.guard';

import { UsersService } from './users.service';

@Controller('users')
@ApiBearerAuth('access-token')
@UseGuards(FirebaseAuthGuard, RolesGuard)
@Roles(Role.PHYSICIAN)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('patients')
  async findAllPatients() {
    return this.usersService.findAllPatients();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
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
