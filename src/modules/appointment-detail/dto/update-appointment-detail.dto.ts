import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateAppointmentDetailDto {
  @IsString()
  @IsNotEmpty()
  diagnosis: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  treatment: string;
}
