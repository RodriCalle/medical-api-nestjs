import { DataSource } from 'typeorm';
import { DATA_SOURCE, MEDICAL_RECORD_REPOSITORY } from 'src/shared/constants';
import { MedicalRecord } from 'src/entities/medical-record.entity';

export const medicalRecordProviders = [
  {
    provide: MEDICAL_RECORD_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(MedicalRecord),
    inject: [DATA_SOURCE],
  },
];
