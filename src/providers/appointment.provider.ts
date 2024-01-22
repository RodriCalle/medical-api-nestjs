import { DataSource } from 'typeorm';
import { APPOINTMENT_REPOSITORY, DATA_SOURCE } from 'src/shared/constants';
import { Appointment } from 'src/entities/appointment.entity';

export const appointmentProviders = [
  {
    provide: APPOINTMENT_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(Appointment),
    inject: [DATA_SOURCE],
  },
];
