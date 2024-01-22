import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateSpecialityDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  name: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  description: string;

  status: boolean;
}
