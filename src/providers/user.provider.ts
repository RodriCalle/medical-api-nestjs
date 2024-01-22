import { DATA_SOURCE, USER_REPOSITORY } from 'src/shared/constants';
import { DataSource } from 'typeorm';
import { User } from 'src/entities/user.entity';

export const userProviders = [
  {
    provide: USER_REPOSITORY,
    useFactory: (ds: DataSource) => ds.getRepository(User),
    inject: [DATA_SOURCE],
  },
];
