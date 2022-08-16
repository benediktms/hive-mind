import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { RepoService } from './repo.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [RepoService],
  exports: [RepoService],
})
export class RepoModule {}
