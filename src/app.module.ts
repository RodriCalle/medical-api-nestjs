import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScheduleModule } from '@nestjs/schedule';
import { SpecialityModule } from './modules/speciality/speciality.module';
import { DoctorModule } from './modules/doctor/doctor.module';
import { PatientModule } from './modules/patient/patient.module';
import { AppointmentModule } from './modules/appointment/appointment.module';
import { RoleModule } from './modules/role/role.module';
import { UserModule } from './modules/user/user.module';
import { AppointmentDetailModule } from './modules/appointment-detail/appointment-detail.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    SpecialityModule,
    DoctorModule,
    PatientModule,
    AppointmentModule,
    UserModule,
    RoleModule,
    AppointmentDetailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
