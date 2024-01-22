import { DataSource } from 'typeorm';
import { DATA_SOURCE, ROLE_REPOSITORY } from 'src/shared/constants';
import { Role } from 'src/entities/role.entity';

export const roleProviders = [
  {
    provide: ROLE_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Role),
    inject: [DATA_SOURCE],
  },
];
