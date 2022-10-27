import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { SensorsService } from './sensors.service';
import { SensorsController } from './sensors.controller';

@Module({
  imports: [HttpModule],
  controllers: [SensorsController],
  providers: [SensorsService],
})
export class SensorsModule {}
