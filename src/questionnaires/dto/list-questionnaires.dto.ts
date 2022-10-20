import { IsEnum, IsOptional } from 'class-validator';
import { Sensor } from 'src/enums/sensor.enum';

export default class ListQuestionnairesDTO {
  @IsOptional()
  @IsEnum(Sensor, { each: true })
  sensor?: Sensor;
}
