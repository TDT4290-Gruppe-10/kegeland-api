import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';

import { Role } from '../roles/enums/role.enum';
import { Roles } from '../roles/roles.decorator';
import { RolesGuard } from '../roles/roles.guard';
import { FirebaseAuthGuard } from '../firebase/firebase-auth.guard';

import { UpdateSensorDto } from './dto/update-sensor.dto';
import { CreateSensorDto } from './dto/create-sensor.dto';
import { SensorsService } from './sensors.service';

@Controller('sensors')
@ApiBearerAuth('access-token')
@UseGuards(FirebaseAuthGuard, RolesGuard)
@Roles(Role.PATIENT, Role.PHYSICIAN)
export class SensorsController {
  constructor(private readonly sensorsService: SensorsService) {}

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.sensorsService.findOne(id);
  }

  @Get()
  async findAll() {
    return this.sensorsService.findAll();
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateSensorDto: UpdateSensorDto,
  ) {
    return this.sensorsService.update(id, updateSensorDto);
  }

  @Post()
  async create(@Body() createSensorDto: CreateSensorDto) {
    return this.sensorsService.create(createSensorDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.sensorsService.delete(id);
  }
}
