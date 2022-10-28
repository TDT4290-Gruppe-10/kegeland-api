import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
} from '@nestjs/common';

import { SensorsService } from './sensors.service';
import { CreateSensorDto } from './dto/create-sensor.dto';
import { UpdateSensorDto } from './dto/update-sensor.dto';

@Controller('sensors')
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
