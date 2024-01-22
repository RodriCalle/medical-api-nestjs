import { Module } from '@nestjs/common';
import { SpecialityService } from './speciality.service';
import { SpecialityController } from './speciality.controller';
import { DatabaseModule } from 'src/database/database.module';
import { specialityProviders } from 'src/providers/speciality.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [SpecialityController],
  providers: [...specialityProviders, SpecialityService],
  exports: [SpecialityService],
})
export class SpecialityModule {}
