import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { Repository } from 'typeorm';
import {
  MEDICAL_RECORD_REPOSITORY,
  PATIENT_REPOSITORY,
  USER_REPOSITORY,
} from 'src/shared/constants';
import { Patient } from 'src/entities/patient.entity';
import { User } from 'src/entities/user.entity';
import { MedicalRecord } from 'src/entities/medical-record.entity';
import * as bcrypt from 'bcrypt';
import { RoleService } from '../role/role.service';
import { Role } from 'src/shared/enums';

@Injectable()
export class PatientService {
  constructor(
    @Inject(MEDICAL_RECORD_REPOSITORY)
    private readonly medicalRecordRepository: Repository<MedicalRecord>,
    @Inject(USER_REPOSITORY)
    private readonly userRepository: Repository<User>,
    @Inject(PATIENT_REPOSITORY)
    private readonly patientRepository: Repository<Patient>,

    private readonly roleService: RoleService,
  ) {}

  async create(createPatientDto: CreatePatientDto) {
    const medicalRecordEntity = new MedicalRecord();
    medicalRecordEntity.description = `Historia Clinica de: ${createPatientDto.name} ${createPatientDto.lastname}`;

    const role = await this.roleService.findOneByName(Role.PATIENT);

    const user = this.userRepository.create({
      ...createPatientDto,
      patient: this.patientRepository.create({
        medicalRecord: this.medicalRecordRepository.create(medicalRecordEntity),
      }),
      roles: [role],
    });

    const rpta = await this.userRepository.save(user);

    return !!rpta;
  }

  async findAll() {
    return await this.patientRepository.find({
      relations: [
        'appointments',
        'medicalRecord',
        'user',
        'appointments.detail',
        'appointments.doctor',
      ],
    });
  }

  async findOne(id: number) {
    const patient = await this.patientRepository.findOne({
      where: { id: id },
      relations: [
        'appointments',
        'medicalRecord',
        'user',
        'appointments.detail',
        'appointments.doctor',
        'appointments.doctor.user',
        'appointments.speciality',
      ],
    });
    if (!patient) {
      throw new NotFoundException(`Patient with ID ${id} not found`);
    }

    return patient;
  }

  async update(id: number, updatePatientDto: UpdatePatientDto) {
    const patient = await this.findOne(id);

    let user = await this.userRepository.findOne({
      where: { id: patient.user.id },
    });

    if (await bcrypt.compare(updatePatientDto.lastPassword, user.password)) {
      const newPassword = await bcrypt.hash(updatePatientDto.password, 10);
      updatePatientDto.password = newPassword;
    } else {
      updatePatientDto.password = user.password;
    }

    user.updatedAt = new Date();
    user.updatedBy = 1;

    user = this.userRepository.merge(user, updatePatientDto);
    const rpta = await this.userRepository.save(user);

    return !!rpta;
  }

  async remove(id: number) {
    const patient = await this.findOne(id);
    return await this.patientRepository.remove(patient);
  }
}
