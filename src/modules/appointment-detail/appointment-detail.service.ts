import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateAppointmentDetailDto } from './dto/update-appointment-detail.dto';
import { APPOINTMENT_DETAIL_REPOSITORY } from 'src/shared/constants';
import { Repository } from 'typeorm';
import { AppointmentDetail } from 'src/entities/appointment-detail.entity';

@Injectable()
export class AppointmentDetailService {
  constructor(
    @Inject(APPOINTMENT_DETAIL_REPOSITORY)
    private readonly appointmentDetailRepository: Repository<AppointmentDetail>,
  ) {}

  async findAll() {
    return await this.appointmentDetailRepository.find();
  }

  async findOne(id: number) {
    const appointmentDetail = await this.appointmentDetailRepository.findOne({
      where: { id: id },
    });
    if (!appointmentDetail) {
      throw new NotFoundException(`Appointment Detail with ID ${id} not found`);
    }
    return appointmentDetail;
  }

  async update(
    id: number,
    updateAppointmentDetailDto: UpdateAppointmentDetailDto,
  ) {
    let appointmentDetail = await this.findOne(id);
    appointmentDetail = this.appointmentDetailRepository.merge(
      appointmentDetail,
      updateAppointmentDetailDto,
    );

    const rpta = await this.appointmentDetailRepository.save(appointmentDetail);

    return !!rpta;
  }
}
