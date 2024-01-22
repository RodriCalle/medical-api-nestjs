import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  lastname: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(300)
  address: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  phone: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(100)
  email: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  password: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  documentType: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  documentNumber: string;

  status: boolean = true;
}
