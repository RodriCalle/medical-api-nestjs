import { Module } from '@nestjs/common';
import { AppointmentDetailService } from './appointment-detail.service';
import { AppointmentDetailController } from './appointment-detail.controller';
import { appointmentDetailProviders } from 'src/providers/appointment-detail.provider';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [AppointmentDetailController],
  providers: [...appointmentDetailProviders, AppointmentDetailService],
})
export class AppointmentDetailModule {}
