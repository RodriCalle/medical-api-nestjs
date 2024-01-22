import { DATA_SOURCE } from 'src/shared/constants';
import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: DATA_SOURCE,
    useFactory: () => {
      const dataSource = new DataSource({
        type: 'mssql',
        host: 'localhost',
        port: 1433, // Puerto por defecto para MSSQL
        username: 'rcalle',
        password: 'Rodrigo123@',
        database: 'MedicalAppointments',
        synchronize: true,
        logging: true, // Puedes ajustar esto según tus necesidades
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],

        /* self signed certificate */
        extra: {
          trustServerCertificate: true,
        },
        options: {
          encrypt: false,
        },
      });

      return dataSource.initialize();
    },
  },
];
