import { Module } from '@nestjs/common';
import { PatientService } from './patient.service';
import { PatientController } from './patient.controller';
import { DatabaseModule } from 'src/database/database.module';
import { patientProviders } from 'src/providers/patient.provider';
import { userProviders } from 'src/providers/user.provider';
import { medicalRecordProviders } from 'src/providers/medical-record.provider';
import { RoleModule } from '../role/role.module';

@Module({
  imports: [DatabaseModule, RoleModule],
  controllers: [PatientController],
  providers: [
    ...medicalRecordProviders,
    ...userProviders,
    ...patientProviders,
    PatientService,
  ],
  exports: [PatientService],
})
export class PatientModule {}
