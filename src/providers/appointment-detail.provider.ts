import { DataSource } from 'typeorm';
import {
  APPOINTMENT_DETAIL_REPOSITORY,
  DATA_SOURCE,
} from 'src/shared/constants';
import { AppointmentDetail } from 'src/entities/appointment-detail.entity';

export const appointmentDetailProviders = [
  {
    provide: APPOINTMENT_DETAIL_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(AppointmentDetail),
    inject: [DATA_SOURCE],
  },
];
