import { DataModule } from '@grp-org/data';
import { Module } from '@nestjs/common';
import { AuthResolver } from './auth.resolver';
import AuthService from './auth.service';

@Module({
  controllers: [],
  providers: [AuthResolver, AuthService],
  exports: [],
  imports: [DataModule],
})
export class AuthModule {}
