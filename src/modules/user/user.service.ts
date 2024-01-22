import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { USER_REPOSITORY, jwtConstants } from 'src/shared/constants';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { Role } from 'src/shared/enums';
import { RoleService } from '../role/role.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: Repository<User>,

    private readonly roleService: RoleService,
    private jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const role = await this.roleService.findOneByName(Role.ADMIN);

    const user = this.userRepository.create({
      ...createUserDto,
      roles: [role],
    });

    const rpta = await this.userRepository.save(user);

    return !!rpta;
  }

  async findAll() {
    return await this.userRepository.find({
      relations: ['roles'],
    });
  }

  async findOne(id: number) {
    return await this.userRepository.findOne({
      where: { id: id },
      relations: ['roles'],
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    let user = await this.userRepository.findOne({
      where: { id: id },
    });

    if (await bcrypt.compare(updateUserDto.lastPassword, user.password)) {
      const newPassword = await bcrypt.hash(updateUserDto.password, 10);
      updateUserDto.password = newPassword;
    } else {
      updateUserDto.password = user.password;
    }

    user.updatedAt = new Date();
    user.updatedBy = 1;

    user = this.userRepository.merge(user, updateUserDto);
    const rpta = await this.userRepository.save(user);

    return !!rpta;
  }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }

  async login(email: string, password: string) {
    const user = await this.userRepository.findOne({
      where: { email: email },
      relations: ['doctor', 'patient', 'roles'],
    });

    if (!user || !(await bcrypt.compare(password, user.password)))
      throw new UnauthorizedException();

    console.log(user.doctor, user.patient);

    const roles = user.roles.map((role) => role.name);
    const doctorId = user.doctor?.id ?? 0;
    const patientId = user.patient?.id ?? 0;

    const payload = {
      sub: user.id,
      email: user.email,
      roles: roles,
      doctorId: doctorId,
      patientId: patientId,
    };

    return {
      access_token: await this.jwtService.signAsync(payload, {
        secret: jwtConstants.secret,
      }),
      user: payload,
    };
  }
}
