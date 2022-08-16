import { Module } from '@nestjs/common';
import { DataService } from './data.service';
import { RepoModule } from './repo.module';
import { RepoService } from './repo.service';
import { databaseProviders } from './database.provider';

@Module({
  providers: [...databaseProviders, DataService, RepoService],
  exports: [...databaseProviders, DataService, RepoService],
  imports: [RepoModule],
})
export class DataModule {}
