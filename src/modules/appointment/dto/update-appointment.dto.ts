import { PartialType } from '@nestjs/swagger';
import { CreateAppointmentDto } from './create-appointment.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateAppointmentDto extends PartialType(CreateAppointmentDto) {
  @IsString()
  @IsNotEmpty()
  status: string;
}
