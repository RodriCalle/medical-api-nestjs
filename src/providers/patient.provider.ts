import { DataSource } from 'typeorm';
import { Patient } from '../entities/patient.entity';
import { DATA_SOURCE, PATIENT_REPOSITORY } from 'src/shared/constants';

export const patientProviders = [
  {
    provide: PATIENT_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Patient),
    inject: [DATA_SOURCE],
  },
];
