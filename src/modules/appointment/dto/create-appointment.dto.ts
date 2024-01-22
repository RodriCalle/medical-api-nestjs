import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateAppointmentDto {
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsString()
  @IsNotEmpty()
  date: Date;

  @IsNumber()
  @IsNotEmpty()
  doctorId: number;

  @IsNumber()
  @IsNotEmpty()
  patientId: number;

  @IsNotEmpty()
  specialityId: number;
}
