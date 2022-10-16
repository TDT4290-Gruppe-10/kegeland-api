import { PartialType } from '@nestjs/swagger';
import { CreateSessionDto } from './create-sensor.dto';

export class UpdateSensorDto extends PartialType(CreateSessionDto) {}
