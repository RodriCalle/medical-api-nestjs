import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { roleProviders } from 'src/providers/role.provider';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [RoleController],
  providers: [...roleProviders, RoleService],
  exports: [RoleService],
})
export class RoleModule {}
