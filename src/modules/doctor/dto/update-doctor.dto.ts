import { PartialType } from '@nestjs/swagger';
import { CreateDoctorDto } from './create-doctor.dto';
import { IsString, MaxLength } from 'class-validator';

export class UpdateDoctorDto extends PartialType(CreateDoctorDto) {
  @IsString()
  lastPassword: string;

  @IsString()
  @MaxLength(50)
  password: string;
}
