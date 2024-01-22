import { PartialType } from '@nestjs/swagger';
import { CreatePatientDto } from './create-patient.dto';
import { IsString, MaxLength } from 'class-validator';

export class UpdatePatientDto extends PartialType(CreatePatientDto) {
  @IsString()
  lastPassword: string;

  @IsString()
  @MaxLength(50)
  password: string;
}
