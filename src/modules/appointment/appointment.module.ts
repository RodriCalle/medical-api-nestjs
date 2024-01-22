import { PatientModule } from './../patient/patient.module';
import { Module } from '@nestjs/common';
import { AppointmentController } from './appointment.controller';
import { DatabaseModule } from 'src/database/database.module';
import { appointmentProviders } from 'src/providers/appointment.provider';
import { appointmentDetailProviders } from 'src/providers/appointment-detail.provider';
import { AppointmentService } from './appointment.service';
import { DoctorModule } from '../doctor/doctor.module';
import { SpecialityModule } from '../speciality/speciality.module';

@Module({
  imports: [SpecialityModule, DoctorModule, PatientModule, DatabaseModule],
  controllers: [AppointmentController],
  providers: [
    ...appointmentProviders,
    ...appointmentDetailProviders,
    AppointmentService,
  ],
})
export class AppointmentModule {}
