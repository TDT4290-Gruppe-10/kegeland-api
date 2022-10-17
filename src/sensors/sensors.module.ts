import { Module } from '@nestjs/common';
import { SensorsService } from './sensors.service';
import { SensorsController } from './sensors.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [SensorsController],
  providers: [SensorsService]
})
export class SensorsModule {}
