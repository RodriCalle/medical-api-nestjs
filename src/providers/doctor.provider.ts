import { DataSource } from 'typeorm';
import { DATA_SOURCE, DOCTOR_REPOSITORY } from 'src/shared/constants';
import { Doctor } from 'src/entities/doctor.entity';

export const doctorProviders = [
  {
    provide: DOCTOR_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Doctor),
    inject: [DATA_SOURCE],
  },
];
