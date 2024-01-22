import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { Repository } from 'typeorm';
import { Appointment } from 'src/entities/appointment.entity';
import {
  APPOINTMENT_DETAIL_REPOSITORY,
  APPOINTMENT_REPOSITORY,
} from 'src/shared/constants';
import { AppointmentDetail } from 'src/entities/appointment-detail.entity';
import { DoctorService } from '../doctor/doctor.service';
import { PatientService } from '../patient/patient.service';
import { SpecialityService } from '../speciality/speciality.service';

@Injectable()
export class AppointmentService {
  constructor(
    @Inject(APPOINTMENT_REPOSITORY)
    private readonly appointmentRepository: Repository<Appointment>,
    @Inject(APPOINTMENT_DETAIL_REPOSITORY)
    private readonly appointmentDetailRepository: Repository<AppointmentDetail>,

    private readonly specialityService: SpecialityService,
    private readonly doctorService: DoctorService,
    private readonly patientService: PatientService,
  ) {}

  async create(createAppointmentDto: CreateAppointmentDto) {
    const patient = await this.patientService.findOne(
      createAppointmentDto.patientId,
    );
    const doctor = await this.doctorService.findOne(
      createAppointmentDto.doctorId,
    );

    const speciality = await this.specialityService.findOne(
      createAppointmentDto.specialityId,
    );

    const detail = new AppointmentDetail();

    const appointment = this.appointmentRepository.create({
      ...createAppointmentDto,
      doctor: doctor,
      patient: patient,
      detail: this.appointmentDetailRepository.create(detail),
      speciality: speciality,
    });
    const rpta = await this.appointmentRepository.save(appointment);
    return !!rpta;
  }

  async findAll() {
    return await this.appointmentRepository.find({
      relations: ['doctor', 'patient', 'detail', 'doctor.user', 'patient.user'],
    });
  }

  async findOne(id: number) {
    const appointment = await this.appointmentRepository.findOne({
      where: { id: id },
      relations: ['doctor', 'patient', 'detail', 'doctor.user', 'patient.user'],
    });
    if (!appointment) {
      throw new NotFoundException(`Appointment with ID ${id} not found`);
    }

    return appointment;
  }

  async update(id: number, updateAppointmentDto: UpdateAppointmentDto) {
    let appointment = await this.findOne(id);
    const patient = await this.patientService.findOne(
      updateAppointmentDto.patientId,
    );
    const doctor = await this.doctorService.findOne(
      updateAppointmentDto.doctorId,
    );

    appointment = this.appointmentRepository.merge(
      appointment,
      updateAppointmentDto,
    );

    appointment.updatedAt = new Date();
    appointment.updatedBy = 1;
    appointment.doctor = doctor;
    appointment.patient = patient;

    const rpta = await this.appointmentRepository.save(appointment);

    return !!rpta;
  }

  async remove(id: number) {
    const appointment = await this.findOne(id);
    return await this.appointmentRepository.remove(appointment);
  }
}
