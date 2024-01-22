import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { userProviders } from 'src/providers/user.provider';
import { DatabaseModule } from 'src/database/database.module';
import { jwtConstants } from 'src/shared/constants';
import { JwtModule } from '@nestjs/jwt';
import { RoleModule } from '../role/role.module';

@Module({
  imports: [
    DatabaseModule,
    RoleModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '600000s' },
    }),
  ],
  controllers: [UserController],
  providers: [...userProviders, UserService],
  exports: [UserService],
})
export class UserModule {}
