import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { IsString, MaxLength } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsString()
  lastPassword: string;

  @IsString()
  @MaxLength(50)
  password: string;

  roles?: any[];
}
