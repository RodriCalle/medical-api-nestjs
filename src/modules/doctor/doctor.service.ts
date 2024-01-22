import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { DOCTOR_REPOSITORY, USER_REPOSITORY } from 'src/shared/constants';
import { Repository } from 'typeorm';
import { Doctor } from 'src/entities/doctor.entity';
import { User } from 'src/entities/user.entity';
import { SpecialityService } from '../speciality/speciality.service';
import * as bcrypt from 'bcrypt';
import { RoleService } from '../role/role.service';
import { Role } from 'src/shared/enums';

@Injectable()
export class DoctorService {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: Repository<User>,

    @Inject(DOCTOR_REPOSITORY)
    private readonly doctorRepository: Repository<Doctor>,

    private readonly specialityService: SpecialityService,

    private readonly roleService: RoleService,
  ) {}

  async create(createDoctorDto: CreateDoctorDto) {
    const speciality = await this.specialityService.findOne(
      createDoctorDto.specialityId,
    );

    const role = await this.roleService.findOneByName(Role.DOCTOR);

    const user = this.userRepository.create({
      ...createDoctorDto,
      doctor: this.doctorRepository.create({
        speciality: speciality,
      }),
      roles: [role],
    });

    const rpta = await this.userRepository.save(user);

    return !!rpta;
  }

  async findAll() {
    return await this.doctorRepository.find({
      relations: ['speciality', 'appointments', 'user'],
    });
  }

  async findAllBySpecialityId(specialityId: number) {
    return await this.doctorRepository.find({
      where: { speciality: { id: specialityId } },
      relations: ['speciality', 'appointments', 'user'],
    });
  }

  async findOne(id: number) {
    const doctor = await this.doctorRepository.findOne({
      where: { id: id },
      relations: ['speciality', 'appointments', 'user'],
    });
    if (!doctor) {
      throw new NotFoundException(`Doctor with ID ${id} not found`);
    }

    return doctor;
  }

  async update(id: number, updateDoctorDto: UpdateDoctorDto) {
    const doctor = await this.findOne(id);
    const speciality = await this.specialityService.findOne(
      updateDoctorDto.specialityId,
    );
    let user = await this.userRepository.findOne({
      where: { id: doctor.user.id },
    });

    doctor.speciality = speciality;

    if (
      await bcrypt.compare(updateDoctorDto.lastPassword, doctor.user.password)
    ) {
      const newPassword = await bcrypt.hash(updateDoctorDto.password, 10);
      updateDoctorDto.password = newPassword;
    } else {
      updateDoctorDto.password = user.password;
    }

    doctor.user.updatedAt = new Date();
    doctor.user.updatedBy = 1;

    user = this.userRepository.merge(user, updateDoctorDto);
    await this.doctorRepository.save(doctor);
    const rpta = await this.userRepository.save(user);

    return !!rpta;
  }

  async remove(id: number) {
    const doctor = await this.findOne(id);
    return await this.doctorRepository.remove(doctor);
  }
}
