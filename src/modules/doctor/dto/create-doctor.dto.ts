import { IsNotEmpty } from 'class-validator';
import { CreateUserDto } from 'src/modules/user/dto/create-user.dto';

export class CreateDoctorDto extends CreateUserDto {
  @IsNotEmpty()
  specialityId: number;
}
