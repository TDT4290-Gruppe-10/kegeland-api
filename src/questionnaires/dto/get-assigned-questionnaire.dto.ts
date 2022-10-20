import { IsEnum } from 'class-validator';
import { Sensor } from 'src/enums/sensor.enum';

export default class GetAssignedQuestionnaireDTO {
  @IsEnum(Sensor, { each: true })
  sensor: Sensor;
}
