import { Module } from '@nestjs/common';
import { DoctorController } from './doctor.controller';
import { DatabaseModule } from 'src/database/database.module';
import { doctorProviders } from 'src/providers/doctor.provider';
import { userProviders } from 'src/providers/user.provider';
import { DoctorService } from './doctor.service';
import { SpecialityModule } from '../speciality/speciality.module';
import { RoleModule } from '../role/role.module';

@Module({
  imports: [SpecialityModule, DatabaseModule, RoleModule],
  controllers: [DoctorController],
  providers: [...userProviders, ...doctorProviders, DoctorService],
  exports: [DoctorService],
})
export class DoctorModule {}
