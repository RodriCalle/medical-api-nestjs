import { DATA_SOURCE, SPECIALITY_REPOSITORY } from 'src/shared/constants';
import { Speciality } from '../entities/speciality.entity';
import { DataSource } from 'typeorm';

export const specialityProviders = [
  {
    provide: SPECIALITY_REPOSITORY,
    useFactory: (ds: DataSource) => ds.getRepository(Speciality),
    inject: [DATA_SOURCE],
  },
];
