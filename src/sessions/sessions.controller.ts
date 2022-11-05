import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';

import { FirebaseAuthGuard } from '../firebase/firebase-auth.guard';
import { Role } from '../roles/enums/role.enum';
import { Roles } from '../roles/roles.decorator';
import { RolesGuard } from '../roles/roles.guard';

import { SessionsService } from './sessions.service';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';
import { ListSessionsDto } from './dto/list-sessions.dto';

@Controller('sessions')
@UseInterceptors(ClassSerializerInterceptor)
@ApiBearerAuth('access-token')
@UseGuards(FirebaseAuthGuard, RolesGuard)
export class SessionsController {
  constructor(private readonly sessionsService: SessionsService) {}

  @Get(':id')
  @Roles(Role.PATIENT, Role.PHYSICIAN)
  async findOne(@Param('id') id: string) {
    return this.sessionsService.findOne(id);
  }

  @Get()
  @Roles(Role.PHYSICIAN)
  async findAll(@Query() filters: ListSessionsDto) {
    return this.sessionsService.findAll(filters);
  }

  @Put(':id')
  @Roles(Role.PATIENT)
  async update(
    @Param('id') id: string,
    @Body() updateSessionDto: UpdateSessionDto,
  ) {
    return this.sessionsService.update(id, updateSessionDto);
  }

  @Post()
  @Roles(Role.PATIENT)
  async create(@Body() createSessionDto: CreateSessionDto) {
    return this.sessionsService.create(createSessionDto);
  }

  @Delete(':id')
  @Roles(Role.PATIENT, Role.PHYSICIAN)
  async delete(@Param('id') id: string) {
    return this.sessionsService.delete(id);
  }
}
